import { useState } from 'react';
import { saveQuizResult } from '../../services/database.js';

export default function RoomQuiz({ quiz, roomProgressId, onComplete, savedQuiz }) {
  const [answers, setAnswers] = useState(savedQuiz?.answers || {});
  const [submitted, setSubmitted] = useState(!!savedQuiz?.score);
  const [score, setScore] = useState(savedQuiz?.score || 0);

  const handleSelect = (qId, optionIndex) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = async () => {
    let correct = 0;
    quiz.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    const pct = Math.round((correct / quiz.length) * 100);
    setScore(pct);
    setSubmitted(true);
    if (roomProgressId) {
      await saveQuizResult(roomProgressId, answers, pct);
    }
    if (onComplete) onComplete(pct);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = quiz.every(q => answers[q.id] !== undefined);

  return (
    <div className="quiz-container fade-in">
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>📝 Room Quiz</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        {submitted ? `You scored ${score}%` : `Answer all ${quiz.length} questions to complete this room.`}
        {submitted && score < 70 && ' — 70% required to pass.'}
      </p>

      {submitted && (
        <div className="score-display" style={{ marginBottom: 24 }}>
          <div className={`score-circle ${score >= 70 ? 'pass' : 'fail'}`}>{score}%</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {score >= 70 ? '🎉 Passed!' : '📖 Review and try again'}
          </p>
        </div>
      )}

      {quiz.map((q, idx) => {
        const isCorrect = submitted && answers[q.id] === q.correct;
        const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correct;
        return (
          <div key={q.id} className="quiz-question">
            <div className="q-number">{q.type === 'scenario' ? '🎯 Scenario' : q.type === 'code_output' ? '💻 Code Output' : '📋 Question'} {idx + 1}</div>
            <div className="q-text" style={{ whiteSpace: 'pre-wrap' }}>{q.question}</div>
            <div className="quiz-options">
              {q.options.map((opt, oi) => (
                <div key={oi}
                  className={`quiz-option ${answers[q.id] === oi ? 'selected' : ''} ${submitted && oi === q.correct ? 'correct' : ''} ${submitted && answers[q.id] === oi && oi !== q.correct ? 'incorrect' : ''}`}
                  onClick={() => handleSelect(q.id, oi)}>
                  <span className="option-marker">
                    {submitted && oi === q.correct ? '✓' : submitted && answers[q.id] === oi && oi !== q.correct ? '✗' : String.fromCharCode(65 + oi)}
                  </span>
                  <span style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        {!submitted ? (
          <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={!allAnswered}>
            Submit Quiz ({Object.keys(answers).length}/{quiz.length})
          </button>
        ) : (
          <>
            {score < 70 && <button className="btn btn-primary btn-lg" onClick={handleRetry}>Retry Quiz</button>}
          </>
        )}
      </div>
    </div>
  );
}
