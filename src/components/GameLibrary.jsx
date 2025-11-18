import React from 'react';
import GameCard from './GameCard';

const GameLibrary = ({ games }) => {
  return (
    <div className="game-library">
      <h2>Mi Biblioteca de Juegos</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;