import React, { useState, useEffect } from 'react';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import Footer from './components/Footer';
import FilterSort from './components/FilterSort';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [view, setView] = useState('library');
  const [gameToEdit, setGameToEdit] = useState(null);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [filters, setFilters] = useState({
    platform: '',
    completed: '',
    rating: ''
  });
  const [sortBy, setSortBy] = useState('title');

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

  const editReview = (review) => {
    setView('edit-review');
    setReviewToEdit(review);
  };

  const updateReview = async (reviewData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewToEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    setView('reviews');
    setReviewToEdit(null);
    fetchReviews();
  };

  const viewGameReviews = (gameId) => {
    setSelectedGameId(gameId);
    setView('game-reviews');
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const getFilteredAndSortedGames = () => {
    let filteredGames = games;

    if (filters.platform) {
      filteredGames = filteredGames.filter(game => 
        game.platform === filters.platform
      );
    }

    if (filters.completed === 'completed') {
      filteredGames = filteredGames.filter(game => game.completed);
    } else if (filters.completed === 'not-completed') {
      filteredGames = filteredGames.filter(game => !game.completed);
    }

    if (filters.rating) {
      filteredGames = filteredGames.filter(game => 
        game.rating >= parseInt(filters.rating)
      );
    }

    filteredGames = [...filteredGames].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'hours':
          return b.hoursPlayed - a.hoursPlayed;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filteredGames;
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
          <>
            <FilterSort 
              filters={filters}
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
            <GameLibrary 
              games={getFilteredAndSortedGames()} 
              onEdit={editGame}
              onDelete={deleteGame}
              onViewReviews={viewGameReviews}
            />
          </>
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
            onEditReview={editReview}
          />
        )}
        {view === 'add-review' && (
          <ReviewForm games={games} onReviewAdded={fetchReviews} />
        )}
        {view === 'edit-review' && (
          <ReviewForm 
            games={games} 
            onReviewAdded={fetchReviews}
            reviewToEdit={reviewToEdit}
            onUpdateReview={updateReview}
          />
        )}
        {view === 'game-reviews' && (
          <div className="game-reviews-view">
            <h2>Reseñas de {selectedGame?.title}</h2>
            <button onClick={() => setView('library')}>Volver a Biblioteca</button>
            <ReviewList 
              reviews={gameReviews} 
              onDeleteReview={deleteReview}
              onEditReview={editReview}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;