import React, { useState, useEffect } from 'react';
import Board from './Board';
import Piece from './Piece';
import socket from '../services/socket';
import { getPossibleMoves } from '../services/gameLogic';

const GameRoom = () => {
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null); // Lựa chọn của người dùng (Player 1 hoặc Player 2)
  const [playerTurn, setPlayerTurn] = useState(1); // Lượt đi đầu tiên của Player 1
  const [capturedPieces, setCapturedPieces] = useState({ 1: [], 2: [] });

  useEffect(() => {
    socket.emit('joinGame', { roomId: 'some-room-id' });

    socket.on('initialBoard', (initialBoard) => {
      setBoard(initialBoard);
    });

    socket.on('updateBoard', (updatedBoard, captured) => {
      setBoard(updatedBoard);
      setCapturedPieces(captured);
      setSelectedPiece(null);
      setPossibleMoves([]);
      setPlayerTurn((prevTurn) => (prevTurn === 1 ? 2 : 1)); // Chuyển lượt đi
    });

    return () => {
      socket.off('initialBoard');
      socket.off('updateBoard');
    };
  }, []);

  const handlePieceClick = (piece) => {
    if (piece.player !== currentPlayer || piece.player !== playerTurn) return; // Chỉ cho phép người chơi hiện tại chọn quân cờ của họ

    setSelectedPiece(piece);
    setPossibleMoves(getPossibleMoves(piece, board));
  };

  const handleMove = (to) => {
    if (!selectedPiece) return;

    const from = selectedPiece.position;
    socket.emit('movePiece', { from, to, currentPlayer });
  };

  const handlePlayerSelection = (player) => {
    setCurrentPlayer(player);
  };

  if (currentPlayer === null) {
    return (
      <div>
        <h1>Chọn Player</h1>
        <button onClick={() => handlePlayerSelection(1)}>Player 1</button>
        <button onClick={() => handlePlayerSelection(2)}>Player 2</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Game Room</h1>
      <h2>You are Player {currentPlayer}</h2> {/* Hiển thị player hiện tại */}
      <Board
        board={board}
        selectedPiece={selectedPiece}
        possibleMoves={possibleMoves}
        onPieceClick={handlePieceClick}
        onMove={handleMove}
      />
      <div>
        <h2>Captured Pieces</h2>
        <div>
          <h3>Player 1</h3>
          {capturedPieces[1].map((piece, index) => (
            <Piece key={index} piece={piece} />
          ))}
        </div>
        <div>
          <h3>Player 2</h3>
          {capturedPieces[2].map((piece, index) => (
            <Piece key={index} piece={piece} />
          ))}
        </div>
      </div>
      <h2>Current Turn: Player {playerTurn}</h2> {/* Hiển thị lượt đi hiện tại */}
    </div>
  );
};

export default GameRoom;
