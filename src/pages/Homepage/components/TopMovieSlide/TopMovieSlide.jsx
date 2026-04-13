import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import "./TopMovieSlide.style.css";
import { responsive } from "../../../../constants/responsive";

const TopMovieSlide = () => {
  const { data, isError, error } = useTopRatedMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Top Rated Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopMovieSlide;
