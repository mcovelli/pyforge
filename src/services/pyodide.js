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

  // No tests = can't pass
  if (!tests || tests.length === 0) {
    const { output, error, plotImage } = await runPython(code);
    return { output, error, plotImage, passed: false, testResults: [] };
  }

  // Run user code to get output
  const { output, error, plotImage } = await runPython(code);

  // If code itself errors, mark all tests as failed
  if (error) {
    const testResults = tests.map(t => ({
      name: t.name, passed: false,
      error: 'Code has errors — fix before tests can run'
    }));
    return { output, error, plotImage, passed: false, testResults };
  }

  const testResults = [];

  for (const test of tests) {
    if (!test.code || test.code.trim() === '') {
      testResults.push({ name: test.name, passed: false, error: 'No test assertion defined' });
      continue;
    }

    try {
      // Reset test result flags and clean user variables
      await pyodide.runPythonAsync(`
_test_passed = False
_test_error = ""
# Clean user-defined variables from previous test run
_keep = {'__builtins__','__name__','__doc__','__package__','__spec__',
         '__annotations__','__loader__','sys','io','os',
         'numpy','np','pandas','pd','matplotlib','plt','base64',
         '_capture_plot','_stdout_capture','_stderr_capture',
         'csv','json','re','math','random','collections',
         'itertools','functools','datetime','sqlite3',
         '_test_passed','_test_error','_keep'}
for _k in list(globals().keys()):
    if _k not in _keep and not _k.startswith('_'):
        try:
            del globals()[_k]
        except:
            pass
del _keep
`);

      // Indent user code and test code to put inside try block
      const indentedCode = code.split('\n').map(l => '    ' + l).join('\n');
      const indentedTest = test.code.split('\n').map(l => '    ' + l).join('\n');

      // Wrap everything in Python try/except — Python itself determines pass/fail
      const wrappedCode = [
        'try:',
        indentedCode,
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

      await pyodide.runPythonAsync(wrappedCode);

      // Read result directly from Python globals
      const passed = await pyodide.runPythonAsync('_test_passed');
      const testError = await pyodide.runPythonAsync('_test_error');

      testResults.push({
        name: test.name,
        passed: passed === true,
        error: passed === true ? null : (testError || 'Test failed'),
      });
    } catch (e) {
      // Even the wrapper crashed (e.g. syntax error in user code)
      const errMsg = e.message || String(e);
      // Extract just the last line of the traceback for readability
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
