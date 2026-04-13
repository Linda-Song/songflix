import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import "./PopularMovieSlide.style.css";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isError, error } = usePopularMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
