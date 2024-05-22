import React from 'react';
import './Piece.css';

const Piece = ({ piece, onClick, isSelected }) => {
  const pieceClass = `piece ${piece.flipped ? piece.type : 'hidden'} ${isSelected ? 'selected' : ''} player-${piece.player}`;
  return (
    <div
      className={pieceClass}
      onClick={onClick}
    >
      {piece.flipped ? piece.type : ''}
    </div>
  );
};

export default Piece;
