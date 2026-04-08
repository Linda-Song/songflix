import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_face${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2 className="movie-title">{movie.title}</h2>
        <div className="movie-black">
          <div className="badge-box">
            {showGenre(movie.genre_ids).map((id) => (
              <Badge bg="danger">{id}</Badge>
            ))}
          </div>
          <div className="movie-info">
            <div>{movie.vote_average}</div>
            <div>{movie.popularity}</div>
            <Badge bg={movie.adult ? "dark" : "info"} className="mt-1">
              {movie.adult ? "over18" : "under18"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
