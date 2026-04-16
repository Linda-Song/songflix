import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.style.css";
import MovieGenre from "../MovieGenre/MovieGenre";
import MovieVideos from "../MovieVideos/MovieVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faHeart,
  faPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie, showOverlay = true }) => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const goDetail = () => {
    navigate(`/movies/${movie.id}`);
  };
  const noImage =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
  const mainPath = movie.backdrop_path || movie.poster_path;
  const backdropUrl = mainPath
    ? `https://media.themoviedb.org/t/p/w533_and_h300_face${mainPath}`
    : noImage;
  const posterUrl = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w500${movie.poster_path}`
    : backdropUrl;

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  return (
    <div
      className={`movie-card ${showInfo ? "active" : ""}`}
      onClick={toggleInfo}
    >
      <div className="card-image" onClick={goDetail}>
        <picture>
          {/* 768px 세로 이미지*/}
          <source srcSet={posterUrl} media="(max-width: 768px)" />
          {/* 기본 가로형 이미지 */}
          <img
            src={backdropUrl}
            alt={movie.title}
            className="card-main-img"
            onError={(e) => {
              e.target.src = noImage;
            }}
          />
        </picture>
      </div>
      {showOverlay && (
        <div className="card-overlay" onClick={goDetail}>
          <div className="card-title-section z-1">
            <h5 className="card-title text-white">{movie.title}</h5>
          </div>
          <div className="card-bottom-info">
            <div className="card-overlay_icons d-flex justify-content-between  ">
              <div className="d-flex gap-2 mb-2 align-items-center">
                <button
                  className="btn btn-link p-0 text-white btn-icon"
                  onClick={handlePlay}
                >
                  <FontAwesomeIcon icon={faCirclePlay} size="xl" />
                </button>
                <button className="btn btn-link p-0 text-white btn-icon">
                  <FontAwesomeIcon icon={faHeart} size="xl" />
                </button>
                <button className="btn btn-link p-0 text-white btn-icon">
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </button>
              </div>
              <button
                className="btn btn-link p-0 text-white btn-icon"
                onClick={goDetail}
                title="View Details"
              >
                <FontAwesomeIcon icon={faChevronDown} size="xl" />
              </button>
            </div>
            <MovieGenre genreIds={movie.genre_ids} />
          </div>
        </div>
      )}
      <MovieVideos
        movieId={movie.id}
        show={showVideo}
        handleClose={() => setShowVideo(false)}
      />
    </div>
  );
};

export default MovieCard;
