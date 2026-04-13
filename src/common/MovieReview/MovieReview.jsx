import React from "react";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import { Alert } from "react-bootstrap";

const MovieReview = ({ movieId }) => {
  const { data, isError, error } = useMovieReviewQuery(movieId);

  const reviews = data?.data.results;

  if (isError) {
    return <Alert variant="danger">${error.message}</Alert>;
  }
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-3 text-white-50">No reviews found for this movie.</div>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h6 className="fw-bold mb-3">{review.author}</h6>
          <p style={{ lineHeight: "1.6" }}>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieReview;
