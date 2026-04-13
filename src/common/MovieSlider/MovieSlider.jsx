import React from "react";
import "./MovieSlider.style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        breakpoints={responsive}
        className="carousel-container"
        watchSlidesProgress={true}
        preventClicks={true}
        autoHeight={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
