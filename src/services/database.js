import Dexie from 'dexie';

const db = new Dexie('PyForgeDB');

db.version(1).stores({
  users: '++id, &username',
  roomProgress: '++id, userId, roomId, visitNumber, [userId+roomId]',
  exerciseAttempts: '++id, roomProgressId, exerciseId',
  quizResults: '++id, roomProgressId',
  aiAssessments: '++id, roomProgressId',
  aiUsage: '++id, userId, date'
});

// --- Input Sanitization ---
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>\"'`;(){}]/g, '').trim().slice(0, 200);
}

// --- Password Hashing (Web Crypto API) ---
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Auth Functions ---
export async function createUser(username, password, displayName) {
  const cleanUser = sanitize(username).toLowerCase();
  const cleanDisplay = sanitize(displayName);
  if (cleanUser.length < 3) throw new Error('Username must be at least 3 characters');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  const existing = await db.users.where('username').equals(cleanUser).first();
  if (existing) throw new Error('Username already taken');
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);
  const id = await db.users.add({
    username: cleanUser,
    displayName: cleanDisplay || cleanUser,
    passwordHash: hash,
    salt,
    createdAt: new Date().toISOString(),
    settings: { theme: 'dark' }
  });
  return { id, username: cleanUser, displayName: cleanDisplay || cleanUser };
}

export async function loginUser(username, password) {
  const cleanUser = sanitize(username).toLowerCase();
  const user = await db.users.where('username').equals(cleanUser).first();
  if (!user) throw new Error('Invalid username or password');
  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) throw new Error('Invalid username or password');
  return { id: user.id, username: user.username, displayName: user.displayName, settings: user.settings };
}

export async function updateUserSettings(userId, settings) {
  await db.users.update(userId, { settings });
}

// --- Progress Functions ---
export async function startRoomVisit(userId, roomId) {
  const visits = await db.roomProgress.where({ userId, roomId }).toArray();
  const visitNumber = visits.length + 1;
  const id = await db.roomProgress.add({
    userId, roomId, visitNumber,
    startedAt: new Date().toISOString(),
    completedAt: null,
    status: 'in_progress',
    overallScore: null,
    sectionProgress: {},
    currentSection: 0
  });
  return { id, visitNumber };
}

export async function getRoomProgress(userId, roomId) {
  return db.roomProgress.where({ userId, roomId }).toArray();
}

export async function getCurrentVisit(userId, roomId) {
  const visits = await db.roomProgress.where({ userId, roomId }).toArray();
  return visits.filter(v => v.status === 'in_progress').pop() || null;
}

export async function updateRoomProgress(progressId, updates) {
  await db.roomProgress.update(progressId, updates);
}

export async function completeRoom(progressId, score) {
  await db.roomProgress.update(progressId, {
    completedAt: new Date().toISOString(),
    status: 'completed',
    overallScore: score
  });
}

export async function getAllProgress(userId) {
  return db.roomProgress.where('userId').equals(userId).toArray();
}

// --- Exercise Attempts ---
export async function saveExerciseAttempt(roomProgressId, exerciseId, userCode, passed) {
  return db.exerciseAttempts.add({
    roomProgressId, exerciseId, userCode, passed,
    attemptedAt: new Date().toISOString()
  });
}

export async function getExerciseAttempts(roomProgressId) {
  return db.exerciseAttempts.where('roomProgressId').equals(roomProgressId).toArray();
}

// --- Quiz Results ---
export async function saveQuizResult(roomProgressId, answers, score) {
  return db.quizResults.add({
    roomProgressId, answers, score,
    completedAt: new Date().toISOString()
  });
}

export async function getQuizResults(roomProgressId) {
  return db.quizResults.where('roomProgressId').equals(roomProgressId).toArray();
}

// --- AI Assessment ---
export async function saveAIAssessment(roomProgressId, assessment) {
  return db.aiAssessments.add({
    roomProgressId,
    ...assessment,
    generatedAt: new Date().toISOString()
  });
}

// --- AI Usage Tracking ---
export async function trackAIUsage(userId) {
  const today = new Date().toISOString().split('T')[0];
  const existing = await db.aiUsage.where({ userId, date: today }).first();
  if (existing) {
    await db.aiUsage.update(existing.id, { count: existing.count + 1 });
    return existing.count + 1;
  }
  await db.aiUsage.add({ userId, date: today, count: 1 });
  return 1;
}

export async function getAIUsageToday(userId) {
  const today = new Date().toISOString().split('T')[0];
  const record = await db.aiUsage.where({ userId, date: today }).first();
  return record ? record.count : 0;
}

// --- Export/Import Progress ---
export async function exportUserData(userId) {
  const progress = await db.roomProgress.where('userId').equals(userId).toArray();
  const progressIds = progress.map(p => p.id);
  const attempts = [];
  const quizzes = [];
  const assessments = [];
  for (const pid of progressIds) {
    attempts.push(...await db.exerciseAttempts.where('roomProgressId').equals(pid).toArray());
    quizzes.push(...await db.quizResults.where('roomProgressId').equals(pid).toArray());
    assessments.push(...await db.aiAssessments.where('roomProgressId').equals(pid).toArray());
  }
  return JSON.stringify({ progress, attempts, quizzes, assessments }, null, 2);
}

export default db;
