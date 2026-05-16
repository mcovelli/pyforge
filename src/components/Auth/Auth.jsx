import { useState } from 'react';
import { createUser, loginUser } from '../../services/database.js';

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let user;
      if (isSignup) {
        user = await createUser(username, password, displayName);
      } else {
        user = await loginUser(username, password);
      }
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container fade-in">
        <div className="auth-header">
          <h1>🔥 PyForge</h1>
          <p>Master Python through hands-on analytics challenges</p>
        </div>
        <div className="auth-card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <label>Display Name</label>
                <input className="input" type="text" value={displayName}
                  onChange={e => setDisplayName(e.target.value)} placeholder="How should we call you?" />
              </div>
            )}
            <div className="form-group">
              <label>Username</label>
              <input className="input" type="text" value={username}
                onChange={e => setUsername(e.target.value)} placeholder="Enter username"
                required minLength={3} autoComplete="username" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="input" type="password" value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                required minLength={6} autoComplete={isSignup ? 'new-password' : 'current-password'} />
            </div>
            {error && <p className="error-text" style={{ marginBottom: 12 }}>⚠️ {error}</p>}
            <button className="btn btn-primary btn-lg" type="submit" disabled={loading}
              style={{ width: '100%', marginTop: 8 }}>
              {loading ? '...' : (isSignup ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          <div className="auth-toggle">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => { setIsSignup(!isSignup); setError(''); }}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
