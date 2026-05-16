import { useState, useEffect } from 'react';
import { getRoomById, getPathForRoom } from '../../data/roomIndex.js';
import { getRoomContent } from '../../data/roomLoader.js';
import { startRoomVisit, getCurrentVisit, updateRoomProgress, completeRoom, getExerciseAttempts, getQuizResults } from '../../services/database.js';
import { generateAssessment, isAIAvailable } from '../../services/ai.js';
import CodeExercise from './CodeExercise.jsx';
import RoomQuiz from './RoomQuiz.jsx';
import PythonEditor from '../Editor/PythonEditor.jsx';
import { runPython } from '../../services/pyodide.js';
import { marked } from 'marked';

export default function RoomView({ roomId, userId, onComplete }) {
  const [activeSection, setActiveSection] = useState('lessons');
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [visitId, setVisitId] = useState(null);
  const [savedCode, setSavedCode] = useState({});
  const [savedQuiz, setSavedQuiz] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [quizScore, setQuizScore] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(false);

  const room = getRoomById(roomId);
  const path = getPathForRoom(roomId);
  const content = getRoomContent(roomId);

  useEffect(() => {
    const init = async () => {
      let visit = await getCurrentVisit(userId, roomId);
      if (!visit) {
        const newVisit = await startRoomVisit(userId, roomId);
        setVisitId(newVisit.id);
        setCompletedExercises(new Set());
        setQuizScore(null);
        setSavedCode({});
        setSavedQuiz(null);
      } else {
        setVisitId(visit.id);
        // Restore previously completed exercises and last code from database
        const attempts = await getExerciseAttempts(visit.id);
        const passedIds = new Set(attempts.filter(a => a.passed).map(a => a.exerciseId));
        setCompletedExercises(passedIds);
        // Build map of exerciseId → most recent code
        const codeMap = {};
        for (const a of attempts) {
          codeMap[a.exerciseId] = a.userCode;
        }
        setSavedCode(codeMap);
        // Restore quiz answers if exists
        const quizzes = await getQuizResults(visit.id);
        if (quizzes.length > 0) {
          const last = quizzes[quizzes.length - 1];
          setQuizScore(last.score);
          setSavedQuiz({ answers: last.answers, score: last.score });
        } else {
          setQuizScore(null);
          setSavedQuiz(null);
        }
      }
      setActiveSection('lessons');
      setActiveLessonIdx(0);
      setAssessment(null);
    };
    init();
  }, [roomId, userId]);

  const handleExerciseComplete = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };

  const handleQuizComplete = async (score) => {
    setQuizScore(score);
    if (score >= 70 && visitId) {
      await completeRoom(visitId, score);
      if (onComplete) onComplete(roomId);
    }
    // Generate AI assessment
    if (isAIAvailable()) {
      setAssessmentLoading(true);
      try {
        const result = await generateAssessment(
          room.title, room.topics, score,
          { score, totalQuestions: content?.quiz?.length || 0 },
          { completed: completedExercises.size, total: content?.exercises?.length || 0 }
        );
        setAssessment(result);
      } catch (e) {
        setAssessment({ overallFeedback: 'AI assessment unavailable: ' + e.message, strengths: [], weaknesses: [], recommendations: [] });
      } finally {
        setAssessmentLoading(false);
      }
    }
  };

  if (!content || !room) return <div className="page-content"><p>Room not found.</p></div>;

  const sections = [
    { id: 'lessons', label: `📖 Lessons (${content.lessons?.length || 0})` },
    { id: 'exercises', label: `💻 Exercises (${completedExercises.size}/${content.exercises?.length || 0})` },
    ...(content.scenarios?.length ? [{ id: 'scenarios', label: `🧪 Scenarios (${content.scenarios.length})` }] : []),
    { id: 'quiz', label: `📝 Quiz${quizScore != null ? ` (${quizScore}%)` : ''}` },
    ...(assessment ? [{ id: 'assessment', label: '🤖 Assessment' }] : []),
  ];

  return (
    <div className="page-content fade-in">
      <div className="room-header">
        <div className="room-path">
          <span>{path?.icon}</span> <span>{path?.name}</span> <span>›</span> <span>Room {roomId}</span>
        </div>
        <h1>{room.title}</h1>
        <p className="room-desc">{room.description}</p>
      </div>

      <div className="room-sections">
        {sections.map(s => (
          <button key={s.id} className={`section-tab ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}>{s.label}</button>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        {activeSection === 'lessons' && content.lessons && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {content.lessons.map((l, i) => (
                <button key={i} className={`section-tab ${activeLessonIdx === i ? 'active' : ''}`}
                  onClick={() => setActiveLessonIdx(i)}>{l.title}</button>
              ))}
            </div>
            <div className="card">
              <div className="lesson-content" dangerouslySetInnerHTML={{
                __html: marked.parse(content.lessons[activeLessonIdx]?.content || '')
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setActiveLessonIdx(Math.max(0, activeLessonIdx - 1))}
                disabled={activeLessonIdx === 0}>← Previous</button>
              {activeLessonIdx < content.lessons.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setActiveLessonIdx(activeLessonIdx + 1)}>Next →</button>
              ) : (
                <button className="btn btn-primary" onClick={() => setActiveSection('exercises')}>Start Exercises →</button>
              )}
            </div>
          </div>
        )}

        {activeSection === 'exercises' && content.exercises && (
          <div>
            {content.exercises.map(ex => (
              <CodeExercise key={ex.id} exercise={ex} roomProgressId={visitId} onComplete={handleExerciseComplete} initialPassed={completedExercises.has(ex.id)} initialCode={savedCode[ex.id]} />
            ))}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button className="btn btn-primary btn-lg" onClick={() => setActiveSection('quiz')}>
                Proceed to Quiz →
              </button>
            </div>
          </div>
        )}

        {activeSection === 'scenarios' && content.scenarios && (
          <div>
            {content.scenarios.map(sc => (
              <ScenarioChallenge key={sc.id} scenario={sc} roomProgressId={visitId} />
            ))}
          </div>
        )}

        {activeSection === 'quiz' && content.quiz && (
          <RoomQuiz quiz={content.quiz} roomProgressId={visitId} onComplete={handleQuizComplete} savedQuiz={savedQuiz} />
        )}

        {activeSection === 'assessment' && assessment && (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 20 }}>🤖 AI Assessment</h2>
            <div className="assessment-card">
              <h3>📊 Overall</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{assessment.overallFeedback}</p>
            </div>
            {assessment.strengths?.length > 0 && (
              <div className="assessment-card">
                <h3>💪 Strengths</h3>
                <ul className="assessment-list">{assessment.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}
            {assessment.weaknesses?.length > 0 && (
              <div className="assessment-card">
                <h3>🎯 Areas for Improvement</h3>
                <ul className="assessment-list">{assessment.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
              </div>
            )}
            {assessment.recommendations?.length > 0 && (
              <div className="assessment-card">
                <h3>📚 Recommendations</h3>
                <ul className="assessment-list">{assessment.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline scenario component
function ScenarioChallenge({ scenario, roomProgressId }) {
  const [code, setCode] = useState(scenario.buggyCode || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  // runPython imported at top level

  const handleRun = async () => {
    try {
      const result = await runPython(code);
      setOutput(result.output);
      setError(result.error);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 8 }}>🧪 {scenario.title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>{scenario.description}</p>
      <div className="editor-toolbar">
        <span className="toolbar-title">Fix the Code</span>
        <button className="btn btn-primary btn-sm" onClick={handleRun}>▶ Run</button>
        <button className="btn btn-secondary btn-sm" onClick={() => setCode(scenario.buggyCode)}>↺ Reset</button>
        {scenario.hints && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setShowHints(true); setRevealedHints(Math.min(revealedHints + 1, scenario.hints.length)); }}>
            💡 Hint ({revealedHints}/{scenario.hints.length})
          </button>
        )}
      </div>
      <PythonEditor code={code} onChange={setCode} />
      {(output || error) && (
        <div className="output-panel">
          <div className="output-header"><span>{error ? '❌ Error' : '📤 Output'}</span></div>
          <div className={`output-content ${error ? 'error' : ''}`}>{error || output}</div>
        </div>
      )}
      {showHints && scenario.hints && (
        <div style={{ marginTop: 12 }}>
          {scenario.hints.slice(0, revealedHints).map((h, i) => (
            <div key={i} className="ai-msg assistant" style={{ marginBottom: 8 }}>💡 {h}</div>
          ))}
        </div>
      )}
    </div>
  );
}

