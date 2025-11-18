import React from 'react';
import GameCard from './GameCard';

const GameLibrary = ({ games, onEdit, onDelete, onViewReviews }) => {
  return (
    <div className="game-library">
      <h2>Mi Biblioteca de Juegos</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard 
            key={game._id} 
            game={game}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewReviews={onViewReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;