// AI Service - Google Gemini Free Tier
// Rate limit: 15 RPM, 1M tokens/day on free tier
// Auto-disables when limit is hit, re-enables next day

const GEMINI_MODEL = 'gemini-2.0-flash';
const MAX_DAILY_REQUESTS = 1400; // Conservative limit under free tier
let rateLimited = false;
let rateLimitResetDate = null;

function getApiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_gemini_api_key_here' && envKey.trim()) return envKey.trim();
  const stored = localStorage.getItem('pyforge_gemini_key');
  return stored || null;
}

export function setApiKey(key) {
  localStorage.setItem('pyforge_gemini_key', key);
}

export function hasApiKey() {
  return !!getApiKey();
}

function checkRateLimit() {
  if (!rateLimited) return true;
  const today = new Date().toISOString().split('T')[0];
  if (rateLimitResetDate && today > rateLimitResetDate) {
    rateLimited = false;
    rateLimitResetDate = null;
    localStorage.removeItem('pyforge_rate_limited');
    return true;
  }
  return false;
}

export function isAIAvailable() {
  // Restore persisted rate limit state
  const stored = localStorage.getItem('pyforge_rate_limited');
  if (stored) {
    const today = new Date().toISOString().split('T')[0];
    if (today > stored) {
      localStorage.removeItem('pyforge_rate_limited');
      rateLimited = false;
    } else {
      rateLimited = true;
      rateLimitResetDate = stored;
    }
  }
  return hasApiKey() && checkRateLimit();
}

async function callGemini(prompt, systemInstruction) {
  if (!checkRateLimit()) {
    throw new Error('AI_RATE_LIMITED: Daily limit reached. AI features will resume tomorrow.');
  }
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('NO_API_KEY: Please set your Gemini API key in Settings.');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
    generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.status === 429 || res.status === 403) {
      rateLimited = true;
      rateLimitResetDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('pyforge_rate_limited', rateLimitResetDate);
      throw new Error('AI_RATE_LIMITED: Daily limit reached. AI features will resume tomorrow.');
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini API error: ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
  } catch (e) {
    if (e.message.startsWith('AI_RATE_LIMITED')) throw e;
    if (e.message.startsWith('NO_API_KEY')) throw e;
    throw new Error(`AI request failed: ${e.message}`);
  }
}

// --- Hint System (Socratic, never gives answer) ---
export async function getHint(exerciseDescription, userCode, errorMsg, hintLevel = 1) {
  const system = `You are a Python tutor helping a student learn. You must NEVER provide the direct answer or complete solution. Instead, guide the student using the Socratic method.
Hint level ${hintLevel}/3:
- Level 1: Ask a guiding question about the concept they seem stuck on
- Level 2: Point them toward the specific area of their code that needs attention and explain the relevant concept
- Level 3: Give a very specific hint about what to change, but still require them to write the code themselves
Keep responses concise (2-4 sentences). Use encouraging language.`;

  const prompt = `Exercise: ${exerciseDescription}
Student's code:
\`\`\`python
${userCode}
\`\`\`
${errorMsg ? `Error message: ${errorMsg}` : 'The code runs but produces incorrect output.'}
Provide a level ${hintLevel} hint.`;

  return callGemini(prompt, system);
}

// --- Post-Quiz Assessment ---
export async function generateAssessment(roomTitle, roomTopics, quizScore, quizDetails, exerciseAttempts) {
  const system = `You are an expert Python instructor. Analyze the student's performance and provide constructive feedback. Be specific and actionable. Format your response as JSON with these keys: strengths (array of strings), weaknesses (array of strings), recommendations (array of strings), overallFeedback (string), suggestedTopics (array of strings to review).`;

  const prompt = `Room: ${roomTitle}
Topics covered: ${roomTopics.join(', ')}
Quiz score: ${quizScore}%
Quiz details: ${JSON.stringify(quizDetails)}
Exercise attempt summary: ${JSON.stringify(exerciseAttempts)}
Generate a detailed assessment.`;

  const text = await callGemini(prompt, system);
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return { strengths: [], weaknesses: [], recommendations: [text], overallFeedback: text, suggestedTopics: [] };
  }
}

// --- Question Regeneration for Revisits ---
export async function regenerateQuestions(roomTitle, topics, originalQuestions, questionType) {
  const system = `You are a Python course content creator specializing in data analytics, business analytics, and systems analytics. Generate NEW questions on the same topics but with DIFFERENT scenarios and data. Return valid JSON array only.`;

  const prompt = `Room: ${roomTitle}
Topics: ${topics.join(', ')}
Question type: ${questionType}
Example questions for reference (generate NEW ones, not copies):
${JSON.stringify(originalQuestions.slice(0, 2))}
Generate ${originalQuestions.length} new questions in the exact same JSON format as the examples. Each question must have different scenarios/data but test the same concepts.`;

  const text = await callGemini(prompt, system);
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return originalQuestions; // Fallback to originals if parsing fails
  }
}

export default { getHint, generateAssessment, regenerateQuestions, isAIAvailable, setApiKey, hasApiKey };
