import { Row, Col, Container, Alert } from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useParams } from "react-router-dom";
import React, { Suspense } from "react";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import MovieReview from "../../common/MovieReview/MovieReview";
import MovieVideos from "../../common/MovieVideos/MovieVideos";
import MovieRec from "../../common/MovieRec/MovieRec";
import MovieGenre from "../../common/MovieGenre/MovieGenre";
import "../MovieDetail/MovieDetailPage.style.css";

//0. 카드 누르면 navigate로 이동( onClick)
//1.비디오 - (또는 이미지, 버튼 클릭시 모달로 영상)
//2. 타이틀, 찜 기타
//3. 왼쪽 개요, 오른쪽 출연,장르,인기도,예산,개봉일
//4. 리뷰스 (화살표로 접기)
//5. 추천영화

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isError, error } = useMovieDetailQuery(id);
  const movie = data?.data;

  const imgUrl = `https://media.themoviedb.org/t/p/original${movie.backdrop_path}`;

  if (isError) {
    return <Alert variant="danger">${error.message}</Alert>;
  }

  return (
    <Container className="p-5 detail-container">
      <Suspense fallback={<LoadingSpinner />}>
        {/* 영화이미지 */}
        <Row className="movie-poster-row">
          <Col className="p-0">
            <div className="position-relative overflow-hidden detail-poster-wrapper">
              <img
                src={imgUrl}
                alt={movie.title}
                className="img-fluid w-100 h-100 object-fit-cover"
              />
              <div className="movie-video-wrapper">
                <MovieVideos movieId={id} />
              </div>
            </div>
          </Col>
        </Row>

        {/* 타이틀, 장르 */}
        <Row className="mb-4 movie-title-row">
          <Col className="mb-4 d-flex flex-column flex-md-row align-items-start align-items-md-end">
            <h1 className="mb-2 mb-md-0 me-4">{movie.title}</h1>
            <div>
              <MovieGenre genreIds={movie.genres?.map((g) => g.id)} />
            </div>
          </Col>
        </Row>

        {/* 영화 개요 */}
        <Row className="mb-5">
          <Col lg={7} className="mb-4">
            <h4 className="mb-3">Overview</h4>
            <p className="">{movie.overview || "No overview available"}</p>
          </Col>

          {/* 영화 정보 */}
          <Col lg={5} className="d-flex justify-content-end">
            <div
              className="p-4 border border-secondary rounded shadow-sm bg-dark bg-opacity-50"
              style={{ minWidth: "300px", width: "100%", maxWidth: "400px" }}
            >
              <div className="mb-3 d-flex justify-content-between border-bottom border-secondary pb-2">
                <span className="text-white-50">Release Date</span>
                <span>{movie.release_date}</span>
              </div>
              <div className="mb-3 d-flex justify-content-between border-bottom border-secondary pb-2">
                <span className="text-white-50">Runtime</span>
                <span>{movie.runtime} min</span>
              </div>
              <div className="mb-3 d-flex justify-content-between border-bottom border-secondary pb-2">
                <span className="text-white-50">Rating</span>
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="mb-0 d-flex justify-content-between">
                <span className="text-white-50">Budget</span>
                <span>
                  {movie.budget && movie.budget !== 0
                    ? `$${movie.budget.toLocaleString()}`
                    : "N/A"}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* 영화 리뷰 */}
        <Row className="mb-5">
          <Col>
            <h3>Reviews</h3>
            <div
              className=" p-5 border border-secondary rounded shadow-sm bg-white bg-opacity-50 text-black overflow-auto"
              style={{ maxHeight: "330px" }}
            >
              <MovieReview movieId={id} />
            </div>
          </Col>
        </Row>

        {/* 추천 영화 */}
        <Row>
          <h3>Recommendations</h3>
          <MovieRec movieId={id} />
        </Row>
      </Suspense>
    </Container>
  );
};

export default MovieDetailPage;
