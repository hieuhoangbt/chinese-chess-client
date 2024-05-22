// src/App.js
import React, { useState, useEffect } from "react";
import GameRoom from "./components/GameRoom";
import GameRoomList from "./components/GameRoomList";
import {
  createRoom,
  joinRoom,
  onRoomCreated,
  onStartGame,
  onGameOver,
  onRoomList,
} from "./services/socket";
import "./App.css";

function App() {
    const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log('window', window.FBInstant.player.getName());
    if (window.FBInstant) {
        const name = window.FBInstant.player.getName();
        setPlayerName(name);
      }
    onRoomCreated((newRoomId) => {
      setRoomId(newRoomId);
      //   setGameStarted(true); // Tự động bắt đầu game sau khi tạo phòng
    });

    onStartGame(() => {
      setGameStarted(true);
    });

    onGameOver((winner) => {
      alert(`Game over! The winner is ${winner}`);
    });

    onRoomList((roomList) => {
      setRooms(roomList);
    });
  }, []);

  const handleCreateRoom = () => {
    createRoom();
  };

  const handleJoinRoom = (roomId) => {
    joinRoom(roomId);
  };

  onStartGame(() => {
    setGameStarted(true);
  });

  onGameOver((winner) => {
    alert(`Game over! The winner is ${winner}`);
  });

  return (
    <div>
      {!gameStarted ? (
        <GameRoomList
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          rooms={rooms}
        />
      ) : (
        <GameRoom />
      )}
    </div>
  );
}

export default App;
