// Room content loader - dynamically imports room data
import room1 from './rooms/room1.js';
import room2 from './rooms/room2.js';
import room3 from './rooms/room3.js';
import room4 from './rooms/room4.js';
import room5 from './rooms/room5.js';
import room6 from './rooms/room6.js';
import room7 from './rooms/room7.js';
import { room8, room9 } from './rooms/room8_9.js';
import { room10, room11, room12, room13 } from './rooms/room10_13.js';
import { room14, room15, room16, room17, room18 } from './rooms/room14_18.js';

const roomData = { 1: room1, 2: room2, 3: room3, 4: room4, 5: room5, 6: room6, 7: room7, 8: room8, 9: room9, 10: room10, 11: room11, 12: room12, 13: room13, 14: room14, 15: room15, 16: room16, 17: room17, 18: room18 };

export function getRoomContent(roomId) {
  return roomData[roomId] || null;
}

export default roomData;
