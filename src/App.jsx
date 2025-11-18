import React, { useState, useEffect } from 'react';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [view, setView] = useState('library');

  useEffect(() => {
    fetchGames();
    fetchReviews();
  }, []);

  const fetchGames = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/games`);
    const data = await response.json();
    setGames(data);
  };

  const fetchReviews = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`);
    const data = await response.json();
    setReviews(data);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={() => setView('library')}>Biblioteca</button>
        <button onClick={() => setView('add-game')}>Agregar Juego</button>
        <button onClick={() => setView('reviews')}>Reseñas</button>
        <button onClick={() => setView('add-review')}>Escribir Reseña</button>
      </nav>

      <div className="content">
        {view === 'library' && <GameLibrary games={games} />}
        {view === 'add-game' && <GameForm onGameAdded={fetchGames} />}
        {view === 'reviews' && <ReviewList reviews={reviews} />}
        {view === 'add-review' && <ReviewForm games={games} onReviewAdded={fetchReviews} />}
      </div>
    </div>
  );
}

export default App;