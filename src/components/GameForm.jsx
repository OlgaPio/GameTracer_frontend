import React, { useState, useEffect } from 'react';
import config from '../config'; 

const GameForm = ({ onGameAdded, gameToEdit, onUpdateGame }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    hoursPlayed: 0,
    completed: false,
    rating: 0,
    image: ''
  });

  useEffect(() => {
    if (gameToEdit) {
      setFormData(gameToEdit);
    }
  }, [gameToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gameToEdit) {
      await onUpdateGame(formData);
      alert('¡Juego actualizado exitosamente!');
    } else {
      await fetch(`${config.API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('¡Juego agregado exitosamente!');
      onGameAdded();
      setFormData({
        title: '',
        platform: '',
        hoursPlayed: 0,
        completed: false,
        rating: 0,
        image: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <h2>{gameToEdit ? 'Editar Juego' : 'Agregar Juego'}</h2>
      <input type="text" placeholder="Título" value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })} required />
      <select value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} required>
        <option value="">Seleccionar plataforma</option>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Mobile">Mobile</option>
      </select>
      <input type="number" placeholder="Horas jugadas" value={formData.hoursPlayed}
        onChange={e => setFormData({ ...formData, hoursPlayed: parseInt(e.target.value) })} />
      <select value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}>
        <option value={0}>Sin rating</option>
        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} estrella{num !== 1 ? 's' : ''}</option>)}
      </select>
      <input type="text" placeholder="URL de imagen" value={formData.image}
        onChange={e => setFormData({ ...formData, image: e.target.value })} />
      <label>
        <input type="checkbox" checked={formData.completed}
          onChange={e => setFormData({ ...formData, completed: e.target.checked })} />
        Completado
      </label>
      <button type="submit">{gameToEdit ? 'Actualizar Juego' : 'Agregar Juego'}</button>
    </form>
  );
};

export default GameForm;