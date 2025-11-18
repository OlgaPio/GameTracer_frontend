import React, { useState } from 'react';

const GameForm = ({ onGameAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    hoursPlayed: 0,
    completed: false,
    rating: 0,
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    onGameAdded();
    setFormData({
      title: '',
      platform: '',
      hoursPlayed: 0,
      completed: false,
      rating: 0,
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <h2>Agregar Juego</h2>
      <input type="text" placeholder="Título" value={formData.title} 
        onChange={e => setFormData({...formData, title: e.target.value})} required />
      <input type="text" placeholder="Plataforma" value={formData.platform} 
        onChange={e => setFormData({...formData, platform: e.target.value})} required />
      <input type="number" placeholder="Horas jugadas" value={formData.hoursPlayed} 
        onChange={e => setFormData({...formData, hoursPlayed: parseInt(e.target.value)})} />
      <select value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}>
        <option value={0}>Sin rating</option>
        {[1,2,3,4,5].map(num => <option key={num} value={num}>{num} estrella{num !== 1 ? 's' : ''}</option>)}
      </select>
      <input type="text" placeholder="URL de imagen" value={formData.image} 
        onChange={e => setFormData({...formData, image: e.target.value})} />
      <label>
        <input type="checkbox" checked={formData.completed} 
          onChange={e => setFormData({...formData, completed: e.target.checked})} />
        Completado
      </label>
      <button type="submit">Agregar Juego</button>
    </form>
  );
};

export default GameForm;