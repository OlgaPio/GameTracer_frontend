import React, { useState, useEffect } from 'react';
import config from '../config'; 

const ReviewForm = ({ games, onReviewAdded, reviewToEdit, onUpdateReview }) => {
  const [formData, setFormData] = useState({
    gameId: '',
    content: '',
    rating: 0
  });

  useEffect(() => {
    if (reviewToEdit) {
      setFormData(reviewToEdit);
    }
  }, [reviewToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewToEdit) {
      await onUpdateReview(formData);
    } else {
      await fetch(`${config.API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onReviewAdded();
      setFormData({ gameId: '', content: '', rating: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>{reviewToEdit ? 'Editar Reseña' : 'Escribir Reseña'}</h2>
      <select value={formData.gameId} onChange={e => setFormData({...formData, gameId: e.target.value})} required>
        <option value="">Seleccionar juego</option>
        {games.map(game => <option key={game._id} value={game._id}>{game.title}</option>)}
      </select>
      <select value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} required>
        <option value={0}>Seleccionar rating</option>
        {[1,2,3,4,5].map(num => <option key={num} value={num}>{num} estrella{num !== 1 ? 's' : ''}</option>)}
      </select>
      <textarea placeholder="Escribe tu reseña..." value={formData.content} 
        onChange={e => setFormData({...formData, content: e.target.value})} required />
      <button type="submit">{reviewToEdit ? 'Actualizar Reseña' : 'Publicar Reseña'}</button>
    </form>
  );
};

export default ReviewForm;