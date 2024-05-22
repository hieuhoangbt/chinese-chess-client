const initialBoardState = () => {
  const player1Pieces = [
    { type: 'chariot', player: 1, initialType: 'chariot' }, { type: 'horse', player: 1, initialType: 'horse' },
    { type: 'elephant', player: 1, initialType: 'elephant' }, { type: 'advisor', player: 1, initialType: 'advisor' },
    { type: 'cannon', player: 1, initialType: 'cannon' },
    { type: 'soldier', player: 1, initialType: 'soldier' }, { type: 'soldier', player: 1, initialType: 'soldier' },
    { type: 'soldier', player: 1, initialType: 'soldier' }, { type: 'soldier', player: 1, initialType: 'soldier' },
    { type: 'soldier', player: 1, initialType: 'soldier' }, // 5 soldiers
    { type: 'chariot', player: 1, initialType: 'chariot' }, { type: 'horse', player: 1, initialType: 'horse' },
    { type: 'elephant', player: 1, initialType: 'elephant' }, { type: 'advisor', player: 1, initialType: 'advisor' },
    { type: 'cannon', player: 1, initialType: 'cannon' },
  ];

  const player2Pieces = [
    { type: 'chariot', player: 2, initialType: 'chariot' }, { type: 'horse', player: 2, initialType: 'horse' },
    { type: 'elephant', player: 2, initialType: 'elephant' }, { type: 'advisor', player: 2, initialType: 'advisor' },
    { type: 'cannon', player: 2, initialType: 'cannon' },
    { type: 'soldier', player: 2, initialType: 'soldier' }, { type: 'soldier', player: 2, initialType: 'soldier' },
    { type: 'soldier', player: 2, initialType: 'soldier' }, { type: 'soldier', player: 2, initialType: 'soldier' },
    { type: 'soldier', player: 2, initialType: 'soldier' }, // 5 soldiers
    { type: 'chariot', player: 2, initialType: 'chariot' }, { type: 'horse', player: 2, initialType: 'horse' },
    { type: 'elephant', player: 2, initialType: 'elephant' }, { type: 'advisor', player: 2, initialType: 'advisor' },
    { type: 'cannon', player: 2, initialType: 'cannon' },
  ];

  const randomizePieces = (pieces) => {
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
  };

  randomizePieces(player1Pieces);
  randomizePieces(player2Pieces);

  const player1Positions = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
    { x: 1, y: 2 }, { x: 7, y: 2 }, { x: 0, y: 3 }, { x: 2, y: 3 },
    { x: 4, y: 3 }, { x: 6, y: 3 }, { x: 8, y: 3 },
  ];

  const player2Positions = [
    { x: 0, y: 9 }, { x: 1, y: 9 }, { x: 2, y: 9 }, { x: 3, y: 9 },
    { x: 5, y: 9 }, { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
    { x: 1, y: 7 }, { x: 7, y: 7 }, { x: 0, y: 6 }, { x: 2, y: 6 },
    { x: 4, y: 6 }, { x: 6, y: 6 }, { x: 8, y: 6 },
  ];

  const pieces = [
    ...player1Pieces.map((piece, index) => ({
      ...piece,
      position: player1Positions[index],
      flipped: false
    })),
    { type: 'king', player: 1, position: { x: 4, y: 0 }, flipped: true, initialType: 'king' },
    ...player2Pieces.map((piece, index) => ({
      ...piece,
      position: player2Positions[index],
      flipped: false
    })),
    { type: 'king', player: 2, position: { x: 4, y: 9 }, flipped: true, initialType: 'king' }
  ];

  return pieces;
};

const movePiece = (board, from, to, currentPlayer) => {
  const piece = board.find(p => p.position.x === from.x && p.position.y === from.y);
  const targetPiece = board.find(p => p.position.x === to.x && p.position.y === to.y);

  if (!piece || !isValidMove(piece, from, to, board)) return board;

  let updatedBoard = board.filter(p => !(p.position.x === to.x && p.position.y === to.y));

  const capturedPieces = { 1: [], 2: [] };

  if (targetPiece) {
    capturedPieces[targetPiece.player].push(targetPiece);
  }

  updatedBoard = updatedBoard.map(p => {
    if (p.position.x === from.x && p.position.y === from.y) {
      return { ...p, position: to, flipped: true };
    }
    return p;
  });

  const opponentKingPosition = getKingPosition(updatedBoard, currentPlayer === 1 ? 2 : 1);
  if (isKingInCheck(opponentKingPosition, updatedBoard, currentPlayer === 1 ? 2 : 1)) {
    console.log(`King of player ${currentPlayer === 1 ? 2 : 1} is in check!`);
  }

  return { updatedBoard, capturedPieces };
};

const flipPiece = (board, position) => {
  return board.map(piece => {
    if (piece.position.x === position.x && piece.position.y === position.y) {
      return { ...piece, flipped: true };
    }
    return piece;
  });
};

const isValidMove = (piece, from, to, board) => {
  const moves = getPossibleMoves(piece, board);
  return moves.some(move => move.x === to.x && move.y === to.y);
};

const isKingInCheck = (kingPosition, board, player) => {
  return board.some(piece => {
    if (piece.player !== player) {
      const possibleMoves = getPossibleMoves(piece, board);
      return possibleMoves.some(move => move.x === kingPosition.x && move.y === kingPosition.y);
    }
    return false;
  });
};

const getKingPosition = (board, player) => {
  const king = board.find(piece => piece.type === 'king' && piece.player === player);
  return king ? king.position : null;
};

const isWithinBounds = (x, y) => x >= 0 && x <= 8 && y >= 0 && y <= 9;

const getPossibleMoves = (piece, board) => {
  const { x, y } = piece.position;

  if (!piece.flipped) {
    return getMovesByPosition(x, y, piece.player, board);
  }

  const moves = [];
  switch (piece.type) {
    case 'king':
      getKingMoves(x, y, moves, piece.player, board);
      break;
    case 'advisor':
      getAdvisorMoves(x, y, moves, piece.player, board);
      break;
    case 'elephant':
      getElephantMoves(x, y, moves, piece.player, board);
      break;
    case 'horse':
      getHorseMoves(x, y, moves, piece.player, board);
      break;
    case 'chariot':
      getChariotMoves(x, y, moves, piece.player, board);
      break;
    case 'cannon':
      getCannonMoves(x, y, moves, piece.player, board);
      break;
    case 'soldier':
      getSoldierMoves(x, y, moves, piece.player, board);
      break;
    default:
      break;
  }

  return moves;
};

const isOccupiedByOwnPiece = (x, y, player, board) => {
  return board.some(piece => piece.position.x === x && piece.position.y === y && piece.player === player);
};

const isBlockedByPiece = (fromX, fromY, toX, toY, board) => {
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  return board.some(piece => piece.position.x === midX && piece.position.y === midY);
};

const getInitialTypeByPosition = (x, y, player) => {
  if (y === 3 || y === 6) {
    return 'soldier';
  } else {
    const initialTypesPlayer1 = [
      'chariot', 'horse', 'elephant', 'advisor', 'king', 'advisor', 'elephant', 'horse', 'chariot',
      null, 'cannon', null, null, null, null, null, 'cannon', null,
      'soldier', null, 'soldier', null, 'soldier', null, 'soldier', null, 'soldier'
    ];

    if (player === 1) {
      if (y === 2 && (x === 1 || x === 7)) {
        return 'cannon';  // Vị trí của quân pháo của Player 2
      }
      return initialTypesPlayer1[x];
    } else {
      if (y === 7 && (x === 1 || x === 7)) {
        return 'cannon';  // Vị trí của quân pháo của Player 2
      }
      return initialTypesPlayer1[8 - x];
    }
  }
};

const getMovesByPosition = (x, y, player, board) => {
  const initialType = getInitialTypeByPosition(x, y, player);
  console.log(x, y, player, initialType);
  const moves = [];
  switch (initialType) {
    case 'soldier':
      getSoldierMoves(x, y, moves, player, board);
      break;
    case 'horse':
      getHorseMoves(x, y, moves, player, board);
      break;
    case 'chariot':
      getChariotMoves(x, y, moves, player, board);
      break;
    case 'elephant':
      getElephantMoves(x, y, moves, player, board);
      break;
    case 'advisor':
      getAdvisorMoves(x, y, moves, player, board);
      break;
    case 'king':
      getKingMoves(x, y, moves, player, board);
      break;
    case 'cannon':
      getCannonMoves(x, y, moves, player, board);
      break;
    default:
      break;
  }
  return moves;
};


const getKingMoves = (x, y, moves, player, board) => {
  const possibleMoves = [
    { x, y: y + 1 }, { x, y: y - 1 },
    { x: x + 1, y }, { x: x - 1, y }
  ];
  possibleMoves.forEach(pos => {
    if (pos.x >= 3 && pos.x <= 5 && ((pos.y >= 0 && pos.y <= 2) || (pos.y >= 7 && pos.y <= 9)) && !isOccupiedByOwnPiece(pos.x, pos.y, player, board)) {
      moves.push(pos);
    }
  });
};

const getAdvisorMoves = (x, y, moves, player, board) => {
  const possibleMoves = [
    { x: x + 1, y: y + 1 }, { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 }, { x: x - 1, y: y - 1 }
  ];
  possibleMoves.forEach(pos => {
    if (pos.x >= 3 && pos.x <= 5 && ((player === 1 && pos.y >= 0 && pos.y <= 9) || (player === 2 && pos.y >= 0 && pos.y <= 9)) && !isOccupiedByOwnPiece(pos.x, pos.y, player, board)) {
      moves.push(pos);
    }
  });
};

const getElephantMoves = (x, y, moves, player, board) => {
  const possibleMoves = [
    { x: x + 2, y: y + 2 }, { x: x - 2, y: y + 2 },
    { x: x + 2, y: y - 2 }, { x: x - 2, y: y - 2 }
  ];
  possibleMoves.forEach(pos => {
    if ((player === 1 && pos.y >= 0 && pos.y <= 9) || (player === 2 && pos.y >= 0 && pos.y <= 9)) {
      if (!isOccupiedByOwnPiece(pos.x, pos.y, player, board) && !isBlockedByPiece(x, y, pos.x, pos.y, board)) {
        moves.push(pos);
      }
    }
  });
};

const getHorseMoves = (x, y, moves, player, board) => {
  const possibleMoves = [
    { x: x + 2, y: y + 1 }, { x: x + 2, y: y - 1 },
    { x: x - 2, y: y + 1 }, { x: x - 2, y: y - 1 },
    { x: x + 1, y: y + 2 }, { x: x + 1, y: y - 2 },
    { x: x - 1, y: y + 2 }, { x: x - 1, y: y - 2 }
  ];
  possibleMoves.forEach(pos => {
    if (isWithinBounds(pos.x, pos.y) && !isBlockedHorseMove(x, y, pos, board) && !isOccupiedByOwnPiece(pos.x, pos.y, player, board)) {
      moves.push(pos);
    }
  });
};

const isBlockedHorseMove = (x, y, pos, board) => {
  const dx = pos.x - x;
  const dy = pos.y - y;
  const block = dx === 2 ? { x: x + 1, y } : dx === -2 ? { x: x - 1, y } : dy === 2 ? { x, y: y + 1 } : { x, y: y - 1 };
  return board.some(piece => piece.position.x === block.x && piece.position.y === block.y);
};

const getChariotMoves = (x, y, moves, player, board) => {
  for (let i = x + 1; i <= 8; i++) {
    if (addMoveIfNotBlocked(x, y, i, y, moves, player, board)) break;
  }
  for (let i = x - 1; i >= 0; i--) {
    if (addMoveIfNotBlocked(x, y, i, y, moves, player, board)) break;
  }
  for (let i = y + 1; i <= 9; i++) {
    if (addMoveIfNotBlocked(x, y, x, i, moves, player, board)) break;
  }
  for (let i = y - 1; i >= 0; i--) {
    if (addMoveIfNotBlocked(x, y, x, i, moves, player, board)) break;
  }
};

const addMoveIfNotBlocked = (fromX, fromY, toX, toY, moves, player, board) => {
  const pieceAtTarget = board.find(piece => piece.position.x === toX && piece.position.y === toY);
  if (pieceAtTarget) {
    if (pieceAtTarget.player !== player) {
      moves.push({ x: toX, y: toY });
    }
    return true;
  }
  moves.push({ x: toX, y: toY });
  return false;
};

const getCannonMoves = (x, y, moves, player, board) => {
  addCannonMovesInDirection(x, y, 1, 0, moves, player, board); // right
  addCannonMovesInDirection(x, y, -1, 0, moves, player, board); // left
  addCannonMovesInDirection(x, y, 0, 1, moves, player, board); // down
  addCannonMovesInDirection(x, y, 0, -1, moves, player, board); // up
};

const addCannonMovesInDirection = (x, y, dx, dy, moves, player, board) => {
  let hasJumped = false;
  for (let i = 1; i <= 8; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (!isWithinBounds(nx, ny)) break;

    const pieceAtTarget = board.find(piece => piece.position.x === nx && piece.position.y === ny);
    if (pieceAtTarget) {
      if (!hasJumped) {
        hasJumped = true;
      } else {
        if (pieceAtTarget.player !== player) {
          moves.push({ x: nx, y: ny });
        }
        break;
      }
    } else {
      if (!hasJumped) {
        moves.push({ x: nx, y: ny });
      }
    }
  }
};

const getSoldierMoves = (x, y, moves, player, board) => {
  const possibleMoves = player === 1 ? [
    { x, y: y + 1 }
  ] : [
    { x, y: y - 1 }
  ];
  possibleMoves.forEach(pos => {
    if (isWithinBounds(pos.x, pos.y) && !isOccupiedByOwnPiece(pos.x, pos.y, player, board)) {
      moves.push(pos);
    }
  });

  if ((player === 1 && y > 4) || (player === 2 && y < 5)) {
    const sideMoves = [
      { x: x + 1, y }, { x: x - 1, y }
    ];
    sideMoves.forEach(pos => {
      if (isWithinBounds(pos.x, pos.y) && !isOccupiedByOwnPiece(pos.x, pos.y, player, board)) {
        moves.push(pos);
      }
    });
  }
};

export {
  initialBoardState,
  flipPiece,
  movePiece,
  getPossibleMoves,
  isValidMove,
  isWithinBounds,
  isKingInCheck,
  getKingPosition
};