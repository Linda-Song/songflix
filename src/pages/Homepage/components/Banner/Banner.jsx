import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert, Spinner } from "react-bootstrap";
import LoadingSpinner from "../../../../common/LoadingSpinner/LoadingSpinner";
import MovieVideos from "../../../../common/MovieVideos/MovieVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [showVideo, setShowVideo] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const movie = data?.results[1];
  if (!movie) return null;
  const handlePlay = (e) => {
    e.stopPropagation();
    setShowVideo(true);
  };
  return (
    <div className="banner-container">
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w1066_and_h600_face${data?.results[1].poster_path}` +
            ")",
        }}
        className="banner"
      >
        <div className="text-white banner-info-area">
          <h1>{data?.results[1].title}</h1>
          <span>{data?.results[1].overview}</span>

          <button
            onClick={handlePlay}
            className="btn btn-link  gap-2 banner-info-btn"
            style={{ textDecoration: "none" }}
          >
            <span className="fw-bold">Play</span>
            <FontAwesomeIcon icon={faCirclePlay} size="2xl" />
          </button>
        </div>

        <MovieVideos
          movieId={movie?.id}
          show={showVideo}
          handleClose={() => setShowVideo(false)}
        />
      </div>
    </div>
  );
};

export default Banner;
