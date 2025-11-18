import React from 'react';

const GameCard = ({ game, onEdit, onDelete, onViewReviews }) => {
  return (
    <div className="game-card">
      {game.image && <img src={game.image} alt={game.title} />}
      <h3>{game.title}</h3>
      <p>Plataforma: {game.platform}</p>
      <p>Horas: {game.hoursPlayed}</p>
      <p>Completado: {game.completed ? 'Sí' : 'No'}</p>
      <div className="stars">
        {'★'.repeat(game.rating)}{'☆'.repeat(5 - game.rating)}
      </div>
      <div className="game-actions">
        <button onClick={() => onViewReviews(game._id)}>Ver Reseñas</button>
        <button onClick={() => onEdit(game)}>Editar</button>
        <button onClick={() => onDelete(game._id)} className="delete-btn">Eliminar</button>
      </div>
    </div>
  );
};

export default GameCard;