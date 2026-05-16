import { useState, useEffect } from 'react';
import { setApiKey, hasApiKey, isAIAvailable } from '../../services/ai.js';
import { exportUserData, getAIUsageToday } from '../../services/database.js';

export default function Settings({ userId }) {
  const [apiKey, setApiKeyState] = useState('');
  const [saved, setSaved] = useState(false);
  const [aiUsage, setAiUsage] = useState(0);
  const [hasKey, setHasKey] = useState(hasApiKey());

  useEffect(() => {
    getAIUsageToday(userId).then(setAiUsage);
  }, [userId]);

  const handleSaveKey = () => {
    setApiKey(apiKey);
    setHasKey(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = async () => {
    const data = await exportUserData(userId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pyforge_progress_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-content fade-in" style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>⚙️ Settings</h1>

      <div className="settings-section">
        <h2>AI Configuration</h2>
        <div className="card">
          <div className="form-group">
            <label>Google Gemini API Key</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
              Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer"
                style={{ color: 'var(--accent-cyan)' }}>aistudio.google.com/apikey</a>.
              Your key is stored locally and never sent to any server except Google's API.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" type="password" value={apiKey}
                onChange={e => setApiKeyState(e.target.value)} placeholder={hasKey ? '••••••••••••••••' : 'Enter your Gemini API key'} />
              <button className="btn btn-primary" onClick={handleSaveKey} disabled={!apiKey}>
                {saved ? '✓ Saved' : 'Save'}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 16, fontSize: '0.85rem' }}>
            <div>Status: <span style={{ color: isAIAvailable() ? 'var(--success)' : 'var(--error)' }}>
              {isAIAvailable() ? '🟢 Active' : hasKey ? '🔴 Rate Limited' : '⚪ No Key'}
            </span></div>
            <div>Today's usage: <span style={{ color: 'var(--text-secondary)' }}>{aiUsage} requests</span></div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Data Management</h2>
        <div className="card">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Your progress is stored locally in your browser. Export to back up your data.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary" onClick={handleExport}>📥 Export Progress</button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>About PyForge</h2>
        <div className="card">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            PyForge is an interactive Python learning platform focused on data analytics, business analytics, 
            and systems analytics. Built with React, Pyodide (in-browser Python), CodeMirror, and Google Gemini AI.
          </p>
          <div style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>Python Runtime: Pyodide v0.27.5 (WebAssembly)</div>
            <div>AI Model: Gemini 2.0 Flash (Free Tier)</div>
            <div>Storage: IndexedDB (Local)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
