// src/services/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export const createRoom = () => {
  socket.emit('createRoom');
};

export const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

export const movePiece = (roomId, move) => {
  socket.emit('move', { roomId, move });
};

export const leaveRoom = (roomId) => {
  socket.emit('leaveRoom', roomId);
};

export const onRoomCreated = (callback) => {
  socket.on('roomCreated', callback);
};

export const onStartGame = (callback) => {
  socket.on('startGame', callback);
};

export const onMove = (callback) => {
  socket.on('move', callback);
};

export const onGameOver = (callback) => {
  socket.on('gameOver', callback);
};

export const onRoomList = (callback) => {
  socket.on('roomList', callback);
};

export default socket;
