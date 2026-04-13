import React from "react";
import { Badge } from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieGenre = ({ genreIds }) => {
  const { data: genreData } = useMovieGenreQuery();

  if (!genreData || !genreIds) return [];
  const genreNameList = genreIds.map((id) => {
    const genreObj = genreData.find((genre) => genre.id === id);
    return genreObj ? genreObj.name : null;
  });
  return (
    <div className="badge-box">
      {genreNameList.slice(0, 3).map((name, index) => (
        <Badge bg="danger" key={index} className="me-1">
          {name}
        </Badge>
      ))}
    </div>
  );
};

export default MovieGenre;
