import React, { useState, useEffect } from 'react';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [view, setView] = useState('library');
  const [gameToEdit, setGameToEdit] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);

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

  const deleteGame = async (gameId) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      await fetch(`${process.env.REACT_APP_API_URL}/games/${gameId}`, {
        method: 'DELETE'
      });
      fetchGames();
    }
  };

  const editGame = (game) => {
    setView('edit-game');
    setGameToEdit(game);
  };

  const updateGame = async (gameData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/games/${gameToEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });
    setView('library');
    setGameToEdit(null);
    fetchGames();
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      await fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      fetchReviews();
    }
  };

  const viewGameReviews = (gameId) => {
    setSelectedGameId(gameId);
    setView('game-reviews');
  };

  const gameReviews = reviews.filter(review => review.gameId === selectedGameId);
  const selectedGame = games.find(game => game._id === selectedGameId);

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={() => setView('library')}>Biblioteca</button>
        <button onClick={() => setView('add-game')}>Agregar Juego</button>
        <button onClick={() => setView('reviews')}>Reseñas</button>
        <button onClick={() => setView('add-review')}>Escribir Reseña</button>
      </nav>

      <div className="content">
        {view === 'library' && (
          <GameLibrary 
            games={games} 
            onEdit={editGame}
            onDelete={deleteGame}
            onViewReviews={viewGameReviews}
          />
        )}
        {view === 'add-game' && <GameForm onGameAdded={fetchGames} />}
        {view === 'edit-game' && (
          <GameForm 
            onGameAdded={fetchGames} 
            gameToEdit={gameToEdit}
            onUpdateGame={updateGame}
          />
        )}
        {view === 'reviews' && (
          <ReviewList 
            reviews={reviews} 
            onDeleteReview={deleteReview}
          />
        )}
        {view === 'add-review' && (
          <ReviewForm games={games} onReviewAdded={fetchReviews} />
        )}
        {view === 'game-reviews' && (
          <div className="game-reviews-view">
            <h2>Reseñas de {selectedGame?.title}</h2>
            <button onClick={() => setView('library')}>Volver a Biblioteca</button>
            <ReviewList 
              reviews={gameReviews} 
              onDeleteReview={deleteReview}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;