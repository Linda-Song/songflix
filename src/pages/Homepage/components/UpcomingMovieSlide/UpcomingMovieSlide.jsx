import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import "./UpcomingMovieSlide.style.css";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isError, error } = useUpcomingMoviesQuery();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Up Coming Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
