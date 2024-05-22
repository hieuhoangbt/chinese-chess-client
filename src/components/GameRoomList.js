import React from 'react';
import './GameRoomList.css';

const GameRoomList = ({ onCreateRoom, onJoinRoom, rooms }) => {

    return (
        <div className="room-list-container">
            <button className="create-room-button" onClick={onCreateRoom}>Tạo bàn chơi</button>
            <div className="room-list">
                {rooms.map(room => (
                    <div key={room.id} className="room-item" onClick={() => onJoinRoom(room.id)}>
                        <div className="player-icon-container">
                            <img src="/icons/user.png" alt="Player" className={`player-icon ${room.players >= 1 ? 'visible' : 'hidden'}`} />
                        </div>
                        <img src="/icons/board.png" alt="Chess Board" className="room-icon" />
                        <div className="player-icon-container">
                            <img src="/icons/user.png" alt="Player" className={`player-icon ${room.players >= 2 ? 'visible' : 'hidden'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameRoomList;
