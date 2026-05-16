import { paths, rooms, isRoomUnlocked } from '../../data/roomIndex.js';

export default function Sidebar({ currentRoomId, completedRooms, onNavigate, user, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🔥</span>
        <h1>PyForge</h1>
      </div>
      <nav className="sidebar-nav">
        <div className="room-nav-item" onClick={() => onNavigate('dashboard')}
          style={!currentRoomId ? { background: 'rgba(0,212,255,0.1)', color: 'var(--accent-cyan)' } : {}}>
          <span className="room-num">📊</span>
          <span>Dashboard</span>
        </div>
        {paths.map(path => (
          <div key={path.id} className="path-group">
            <div className={`path-label ${path.color}`}>{path.icon} {path.name}</div>
            {path.rooms.map(roomId => {
              const room = rooms.find(r => r.id === roomId);
              const completed = completedRooms.includes(roomId);
              const unlocked = isRoomUnlocked(roomId, completedRooms);
              const active = currentRoomId === roomId;
              return (
                <div key={roomId}
                  className={`room-nav-item ${active ? 'active' : ''} ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                  onClick={() => unlocked && onNavigate('room', roomId)}>
                  <span className="room-num">{completed ? '✓' : roomId}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {room.title}
                  </span>
                  {!unlocked && <span style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>🔒</span>}
                </div>
              );
            })}
          </div>
        ))}
        <div className="room-nav-item" onClick={() => onNavigate('settings')} style={{ marginTop: 12 }}>
          <span className="room-num">⚙️</span>
          <span>Settings</span>
        </div>
      </nav>
      <div className="sidebar-user">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.displayName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{user?.username}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
