import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.style.css";
import MovieGenre from "../MovieGenre/MovieGenre";

const MovieCard = ({ movie, showOverlay = true }) => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const goDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const imgUrl = `https://media.themoviedb.org/t/p/w533_and_h300_face${movie.backdrop_path}`;
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={`movie-card ${showInfo ? "active" : ""}`}
      onClick={toggleInfo}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={goDetail}
      ></div>
      {showOverlay && (
        <div className="card-overlay" onClick={goDetail}>
          <h2 className="movie-title">{movie.title}</h2>
          <MovieGenre genreIds={movie.genre_ids} />
          <div className="movie-info mt-2">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="text-white-50" style={{ fontSize: "0.8rem" }}>
              ({movie.popularity.toFixed(0)} hits)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
