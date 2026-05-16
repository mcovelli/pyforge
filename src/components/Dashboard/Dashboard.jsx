import { useState, useEffect } from 'react';
import { rooms, paths, getPathForRoom, isRoomUnlocked } from '../../data/roomIndex.js';
import { getAllProgress } from '../../services/database.js';

export default function Dashboard({ userId, completedRooms, onNavigate }) {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    getAllProgress(userId).then(setProgress);
  }, [userId]);

  const totalRooms = rooms.length;
  const completedCount = completedRooms.length;
  const pct = Math.round((completedCount / totalRooms) * 100);

  const bestScores = {};
  progress.filter(p => p.status === 'completed' && p.overallScore != null).forEach(p => {
    if (!bestScores[p.roomId] || p.overallScore > bestScores[p.roomId]) {
      bestScores[p.roomId] = p.overallScore;
    }
  });
  const avgScore = Object.values(bestScores).length > 0
    ? Math.round(Object.values(bestScores).reduce((a,b) => a+b, 0) / Object.values(bestScores).length) : 0;

  const visitCounts = {};
  progress.forEach(p => { visitCounts[p.roomId] = (visitCounts[p.roomId] || 0) + 1; });

  return (
    <div className="page-content fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Track your Python mastery journey</p>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{completedCount}/{totalRooms}</div>
          <div className="stat-label">Rooms Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{pct}%</div>
          <div className="stat-label">Overall Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.values(visitCounts).reduce((a,b)=>a+b, 0)}</div>
          <div className="stat-label">Total Visits</div>
        </div>
      </div>

      <div className="progress-bar" style={{ marginBottom: 32, height: 10 }}>
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>

      {paths.map(path => (
        <div key={path.id} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, color: `var(--accent-${path.color === 'pink' ? 'pink' : path.color})` }}>
            {path.icon} {path.name}
          </h2>
          <div className="room-grid">
            {path.rooms.map(roomId => {
              const room = rooms.find(r => r.id === roomId);
              const completed = completedRooms.includes(roomId);
              const unlocked = isRoomUnlocked(roomId, completedRooms);
              const visits = visitCounts[roomId] || 0;
              const best = bestScores[roomId];
              return (
                <div key={roomId} className={`room-card ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                  onClick={() => unlocked && onNavigate('room', roomId)}>
                  <div className="room-number">Room {roomId} · {room.difficulty} · {room.estimatedTime}</div>
                  <h3>{room.title}</h3>
                  <p>{room.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    {completed ? (
                      <span className="visit-badge completed">✓ Completed</span>
                    ) : unlocked ? (
                      <span className="visit-badge in-progress">{visits > 0 ? 'In Progress' : 'Ready'}</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>🔒 Locked</span>
                    )}
                    {visits > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{visits} visit{visits > 1 ? 's' : ''}</span>}
                    {best != null && <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>Best: {best}%</span>}
                  </div>
                  <div className="room-tags">
                    {room.topics.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
