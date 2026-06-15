// Pyodide Service - In-browser Python execution via WebAssembly
let pyodide = null;
let loading = false;
let loadError = null;
const listeners = new Set();

export function onStatusChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  const status = getStatus();
  listeners.forEach(fn => fn(status));
}

export function getStatus() {
  if (loadError) return { state: 'error', error: loadError };
  if (loading) return { state: 'loading' };
  if (pyodide) return { state: 'ready' };
  return { state: 'idle' };
}

export async function initPyodide() {
  if (pyodide || loading) return pyodide;
  loading = true;
  loadError = null;
  notify();

  try {
    // Load Pyodide from CDN
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }

    pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/'
    });

    // Pre-load common packages
    await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib']);

    // Setup matplotlib for non-interactive backend
    await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import io, base64

def _capture_plot():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', facecolor='#1a1a2e', edgecolor='none')
    buf.seek(0)
    img = base64.b64encode(buf.read()).decode('utf-8')
    plt.close('all')
    return img
`);

    loading = false;
    notify();
    return pyodide;
  } catch (e) {
    loading = false;
    loadError = e.message;
    notify();
    throw e;
  }
}

export async function runPython(code, timeout = 30000) {
  if (!pyodide) await initPyodide();

  // Capture stdout/stderr
  await pyodide.runPythonAsync(`
import sys, io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
`);

  let output = '';
  let error = null;
  let plotImage = null;

  try {
    // Run with timeout
    const result = await Promise.race([
      pyodide.runPythonAsync(code),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Execution timed out (30s limit)')), timeout))
    ]);

    // Capture output
    output = await pyodide.runPythonAsync('_stdout_capture.getvalue()');
    const stderr = await pyodide.runPythonAsync('_stderr_capture.getvalue()');
    if (stderr) output += '\n' + stderr;

    // Check for matplotlib figures
    try {
      const hasPlot = await pyodide.runPythonAsync('len(plt.get_fignums()) > 0');
      if (hasPlot) {
        plotImage = await pyodide.runPythonAsync('_capture_plot()');
      }
    } catch {}

    // If result is meaningful, append it
    if (result !== undefined && result !== null && String(result) !== 'None') {
      output += (output ? '\n' : '') + String(result);
    }
  } catch (e) {
    error = e.message || String(e);
    try {
      output = await pyodide.runPythonAsync('_stdout_capture.getvalue()');
    } catch {}
  }

  // Restore stdout/stderr
  await pyodide.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

  return { output: output || '', error, plotImage };
}

// Run code then check each test assertion INSIDE Python for bulletproof evaluation
export async function runWithTests(code, tests) {
  if (!pyodide) await initPyodide();

  if (!tests || tests.length === 0) {
    const { output, error, plotImage } = await runPython(code);
    return { output, error, plotImage, passed: false, testResults: [] };
  }

  // 1. Clean the global namespace EXACTLY ONCE before running any code
  try {
    await pyodide.runPythonAsync(`
# Clean user-defined variables from a completely separate previous execution run
_keep = {'__builtins__','__name__','__doc__','__package__','__spec__',
         '__annotations__','__loader__','sys','io','os',
         'numpy','np','pandas','pd','matplotlib','plt','base64',
         '_capture_plot','_stdout_capture','_stderr_capture',
         'csv','json','re','math','random','collections',
         'itertools','functools','datetime','sqlite3'}
for _k in list(globals().keys()):
    if _k not in _keep and not _k.startswith('_'):
        try:
            del globals()[_k]
        except:
            pass
del _keep
`);
  } catch (e) {
    console.error("Namespace initialization failed:", e);
  }

  // 2. Run user code to capture output and set up variables globally
  const { output, error, plotImage } = await runPython(code);

  // If code itself has a syntax or runtime error, fail all tests immediately
  if (error) {
    const testResults = tests.map(t => ({
      name: t.name, passed: false,
      error: 'Code has errors — fix before tests can run'
    }));
    return { output, error, plotImage, passed: false, testResults };
  }

  const testResults = [];

  // 3. Evaluate assertions against the populated global state
  for (const test of tests) {
    if (!test.code || test.code.trim() === '') {
      testResults.push({ name: test.name, passed: false, error: 'No test assertion defined' });
      continue;
    }

    try {
      await pyodide.runPythonAsync(`
_test_passed = False
_test_error = ""
`);

      const indentedTest = test.code.split('\n').map(l => '    ' + l).join('\n');

      const wrappedTest = [
        'try:',
        indentedTest,
        '    _test_passed = True',
        '    _test_error = ""',
        'except AssertionError as _e:',
        '    _test_passed = False',
        '    _test_error = str(_e) if str(_e) else "Assertion failed"',
        'except Exception as _e:',
        '    _test_passed = False',
        '    _test_error = type(_e).__name__ + ": " + str(_e)',
      ].join('\n');

      await pyodide.runPythonAsync(wrappedTest);

      const passed = await pyodide.runPythonAsync('_test_passed');
      const testError = await pyodide.runPythonAsync('_test_error');

      testResults.push({
        name: test.name,
        passed: passed === true,
        error: passed === true ? null : (testError || 'Test failed'),
      });
    } catch (e) {
      const errMsg = e.message || String(e);
      const lastLine = errMsg.split('\n').filter(l => l.trim()).pop() || errMsg;
      testResults.push({
        name: test.name,
        passed: false,
        error: lastLine,
      });
    }
  }

  const allPassed = testResults.length > 0 && testResults.every(t => t.passed === true);
  return { output, error, plotImage, passed: allPassed, testResults };
}

// Load additional packages on demand
export async function loadPackage(pkg) {
  if (!pyodide) await initPyodide();
  await pyodide.loadPackage(pkg);
}
