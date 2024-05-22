import React from 'react';
import Piece from './Piece';
import './Board.css';
import { playSound } from '../services/sound';

const Board = ({ board, selectedPiece, possibleMoves, onPieceClick, onMove }) => {

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < 10; y++) {
      const cells = [];
      for (let x = 0; x < 9; x++) {
        const piece = board.find(p => p.position.x === x && p.position.y === y);
        const isPossibleMove = possibleMoves.some(move => move.x === x && move.y === y);

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`cell ${isPossibleMove ? 'possible-move' : ''} ${piece ? 'hasPiece' : ''}`}
            onClick={() => {
              if (isPossibleMove) {
                onMove({ x, y });
              }
              playSound('move');
            }}
          >
            {isPossibleMove && (
              <div className='pm'></div>
            )}
            {piece && (
              <Piece
                piece={piece}
                onClick={() => onPieceClick(piece)}
                isSelected={selectedPiece && selectedPiece.position.x === x && selectedPiece.position.y === y}
              />
            )}
          </div>
        );
      }
      rows.push(<div key={y} className="row">{cells}</div>);
    }
    return rows;
  };

  return (
    <div className="board">
      {renderBoard()}
    </div>
  );
};

export default Board;
