import { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import RoomView from './components/Room/RoomView.jsx';
import Settings from './components/Settings/Settings.jsx';
import { getAllProgress } from './services/database.js';
import { initPyodide, onStatusChange, getStatus } from './services/pyodide.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [completedRooms, setCompletedRooms] = useState([]);
  const [pyStatus, setPyStatus] = useState(getStatus());

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem('pyforge_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  // Load progress when user logs in
  useEffect(() => {
    if (user) {
      localStorage.setItem('pyforge_user', JSON.stringify(user));
      loadProgress();
      // Start loading Pyodide in background
      initPyodide().catch(() => {});
    }
  }, [user]);

  // Track Pyodide status
  useEffect(() => {
    return onStatusChange(setPyStatus);
  }, []);

  const loadProgress = async () => {
    if (!user) return;
    const progress = await getAllProgress(user.id);
    const completed = [...new Set(
      progress.filter(p => p.status === 'completed').map(p => p.roomId)
    )];
    setCompletedRooms(completed);
  };

  const handleNavigate = (target, roomId) => {
    if (target === 'room' && roomId) {
      setView('room');
      setCurrentRoomId(roomId);
    } else if (target === 'settings') {
      setView('settings');
      setCurrentRoomId(null);
    } else {
      setView('dashboard');
      setCurrentRoomId(null);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pyforge_user');
    setView('dashboard');
    setCurrentRoomId(null);
  };

  const handleRoomComplete = (roomId) => {
    if (!completedRooms.includes(roomId)) {
      setCompletedRooms(prev => [...prev, roomId]);
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  return (
    <div className="app-layout">
      <Sidebar
        currentRoomId={currentRoomId}
        completedRooms={completedRooms}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>
              {view === 'dashboard' ? '📊 Dashboard' : view === 'settings' ? '⚙️ Settings' : `Room ${currentRoomId}`}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {completedRooms.length}/18 rooms completed
            </div>
            <div className="progress-bar" style={{ width: 120 }}>
              <div className="fill" style={{ width: `${(completedRooms.length / 18) * 100}%` }} />
            </div>
          </div>
        </header>

        {view === 'dashboard' && (
          <Dashboard userId={user.id} completedRooms={completedRooms} onNavigate={handleNavigate} />
        )}
        {view === 'room' && currentRoomId && (
          <RoomView roomId={currentRoomId} userId={user.id} onComplete={handleRoomComplete} />
        )}
        {view === 'settings' && (
          <Settings userId={user.id} />
        )}
      </div>

      {/* Pyodide Status Indicator */}
      {pyStatus.state !== 'ready' && (
        <div className={`pyodide-status ${pyStatus.state}`}>
          {pyStatus.state === 'loading' && <><span className="spinner" style={{ width: 16, height: 16 }} /> Loading Python...</>}
          {pyStatus.state === 'error' && <>❌ Python failed to load</>}
          {pyStatus.state === 'idle' && <>⏳ Python not loaded</>}
        </div>
      )}
    </div>
  );
}
