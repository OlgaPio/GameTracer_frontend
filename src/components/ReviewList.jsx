import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h2>Reseñas</h2>
      {reviews.map(review => (
        <div key={review._id} className="review-card">
          <h3>{review.gameTitle}</h3>
          <div className="stars">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </div>
          <p>{review.content}</p>
          <small>{new Date(review.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;