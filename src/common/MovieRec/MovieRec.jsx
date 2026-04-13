import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useMovieRecQuery } from "../../hooks/useMovieRec";
import { Col, Row, Button, Collapse, Alert } from "react-bootstrap";

const MovieRec = ({ movieId }) => {
  const [open, setOpen] = useState(false);
  const { data, isError, error } = useMovieRecQuery(movieId);
  const recommendations = data?.data?.results;

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!recommendations || recommendations.length === 0) {
    return <div className="mt-3 text-white-50"> No recommendations found.</div>;
  }
  // 기본 보여지는 영화
  const basicRecs = recommendations.slice(0, 6);
  // 더보기를 눌러야 나오는 영화
  const extraRecs = recommendations.slice(6, 18);

  return (
    <div className="mt-4">
      <Row className="gy-4">
        {/* 1. 처음 6개 영화 */}
        {basicRecs.map((movie) => (
          <Col key={movie.id} lg={2} md={4} sm={6} xs={6}>
            <MovieCard movie={movie} showOverlay={false} />
          </Col>
        ))}
      </Row>
      {/* 2. 버튼 누르면 펼쳐지는 영역 */}
      <Collapse in={open}>
        <div id="extra-movies">
          <Row className="gy-4 mt-1">
            {extraRecs.map((movie) => (
              <Col key={movie.id} lg={2} md={4} sm={6} xs={6}>
                <MovieCard movie={movie} showOverlay={false} />
              </Col>
            ))}
          </Row>
        </div>
      </Collapse>

      {/* 3. 더보기 버튼  */}
      {extraRecs.length > 0 && (
        <div className="text-center mt-4">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="extra-movies"
            aria-expanded={open}
            variant="outline-light"
            className="rounded-pill px-4"
          >
            {open ? "Close ▲" : "More ▼"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovieRec;
