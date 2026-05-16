import { useState } from 'react';
import PythonEditor from '../Editor/PythonEditor.jsx';
import { runWithTests } from '../../services/pyodide.js';
import { getHint, isAIAvailable } from '../../services/ai.js';
import { saveExerciseAttempt } from '../../services/database.js';

export default function CodeExercise({ exercise, roomProgressId, onComplete, initialPassed = false, initialCode }) {
  const [code, setCode] = useState(initialCode || exercise.starterCode || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [plotImage, setPlotImage] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [passed, setPassed] = useState(initialPassed);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [hints, setHints] = useState([]);
  const [hintLoading, setHintLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    setOutput('');
    setPlotImage(null);
    setTestResults([]);
    setPassed(false); // Reset pass state on every run
    setHasRun(true);
    try {
      const result = await runWithTests(code, exercise.tests || []);
      setOutput(result.output || '');
      setError(result.error || null);
      setPlotImage(result.plotImage || null);
      setTestResults(result.testResults || []);
      setPassed(result.passed === true);
      if (roomProgressId) {
        await saveExerciseAttempt(roomProgressId, exercise.id, code, result.passed === true);
      }
      if (result.passed === true && onComplete) onComplete(exercise.id);
    } catch (e) {
      setError(e.message || 'An unexpected error occurred');
      setPassed(false);
      setTestResults([]);
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode || '');
    setOutput('');
    setError(null);
    setPlotImage(null);
    setTestResults([]);
    setPassed(false);
    setHasRun(false);
  };

  const handleHint = async () => {
    if (!isAIAvailable()) {
      setHints(prev => [...prev, { role: 'system', text: 'AI is unavailable. Check your API key in Settings or wait for daily limit reset.' }]);
      return;
    }
    setHintLoading(true);
    setShowHints(true);
    try {
      const level = Math.min(hints.filter(h => h.role === 'assistant').length + 1, 3);
      const hint = await getHint(exercise.description, code, error, level);
      setHints(prev => [...prev, { role: 'assistant', text: hint }]);
    } catch (e) {
      setHints(prev => [...prev, { role: 'system', text: e.message }]);
    } finally {
      setHintLoading(false);
    }
  };

  const totalTests = exercise.tests?.length || 0;
  const passedTests = testResults.filter(t => t.passed).length;
  const failedTests = testResults.filter(t => !t.passed).length;

  return (
    <div className="card fade-in" style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        💻 {exercise.title}
        {passed && <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 600 }}>✓ All Tests Passed</span>}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 16, lineHeight: 1.6 }}>
        {exercise.description}
      </p>

      <div className="editor-toolbar">
        <span className="toolbar-title">Python</span>
        <button className="btn btn-primary btn-sm" onClick={handleRun} disabled={running}>
          {running ? '⏳ Running...' : '▶ Run Code'}
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>↺ Reset</button>
        <button className="btn btn-ghost btn-sm" onClick={handleHint} disabled={hintLoading}>
          🤖 {hintLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>
      <PythonEditor code={code} onChange={setCode} />

      {/* Always show output panel after running */}
      {hasRun && (
        <div className="output-panel">
          <div className="output-header">
            <span>{error ? '❌ Error' : '📤 Output'}</span>
          </div>
          <div className={`output-content ${error ? 'error' : ''}`}>
            {error || output || '(No output)'}
            {plotImage && <img src={`data:image/png;base64,${plotImage}`} alt="Plot" />}
          </div>
        </div>
      )}

      {/* Always show test results after running */}
      {hasRun && totalTests > 0 && (
        <div className="test-results">
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Test Results</span>
            <span>{passedTests}/{totalTests} passed {failedTests > 0 ? `• ${failedTests} failed` : ''}</span>
          </div>
          {testResults.length > 0 ? (
            testResults.map((t, i) => (
              <div key={i} className={`test-item ${t.passed ? 'passed' : 'failed'}`}>
                <span className="test-icon">{t.passed ? '✓' : '✗'}</span>
                <span>{t.name}</span>
                {!t.passed && t.error && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: 4, fontFamily: 'monospace', opacity: 0.8 }}>
                    {t.error.split('\n').pop()}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {error ? 'Fix code errors before tests can run.' : 'No test results yet.'}
            </div>
          )}
        </div>
      )}

      {showHints && hints.length > 0 && (
        <div className="ai-tutor" style={{ marginTop: 16 }}>
          <div className="ai-tutor-header">
            <h4>🤖 AI Tutor</h4>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowHints(false)}>Hide</button>
          </div>
          <div className="ai-messages">
            {hints.map((h, i) => (
              <div key={i} className={`ai-msg ${h.role}`}>{h.text}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
