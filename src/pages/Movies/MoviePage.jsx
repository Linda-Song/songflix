import React, { useMemo, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Alert,
  Dropdown,
  ButtonGroup,
  Button,
  DropdownMenu,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginateModule from "react-paginate";
import "../Movies/MoviePage.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

//경로 2가지
//1. navbar 를 클릭 ==> popular movie
//2. keyword를 입력 ==> 키워드와 관련된 영화

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [showGenre, setShowGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const { data: genres } = useMovieGenreQuery();
  const keyword = query.get("q");
  const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

  const { data, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genreId: selectedGenre,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreClick = (genreId) => {
    const nextGenre = selectedGenre === genreId ? null : genreId;
    setSelectedGenre(nextGenre);
    setPage(1);
  };

  const sortedMovies = useMemo(() => {
    if (!data?.data.results) return [];
    let list = [...data.data.results];

    if (sortBy === "desc") {
      list.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "asc") {
      list.sort((a, b) => a.popularity - b.popularity);
    }
    return list;
  }, [data, sortBy]);

  if (isError) {
    return <Alert variant="danger"> {error.message}</Alert>;
  }

  return (
    <Container className="mt-2 movie-page-container">
      <Row className="align-items-center px-2">
        <Col xs="auto" className="mb-4">
          <h3 className="movie-filter">Movies</h3>
        </Col>

        {/* 토글 */}
        <Col className="d-flex gap-2 align-items-center flex-wrap">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => setShowGenre(!showGenre)}
            className={`filter-btn ${showGenre ? "btn-active" : ""}`}
          >
            Genres {showGenre ? "▼" : "▲"}
          </Button>

          {/* 카테고리 토글 */}
          <Dropdown
            as={ButtonGroup}
            variant="outline-light"
            size="sm"
            className="filter-btn"
          >
            <Dropdown.Toggle
              variant="outline-light"
              size="sm"
              className="filter-btn"
            >
              {sortBy === "desc"
                ? "Popularity(High To Low)"
                : sortBy === "asc"
                  ? "Popularity (Low to High)"
                  : "Sort By"}
            </Dropdown.Toggle>

            <DropdownMenu variant="dark">
              <Dropdown.Item onClick={() => setSortBy("desc")}>
                Popularity (High to Low)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("asc")}>
                Popularity (Low to High)
              </Dropdown.Item>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      {/* 장르박스 */}
      {showGenre && (
        <Row className="mb-4 px-2">
          <Col xs={12}>
            <div className="genre-box">
              {genres?.map((genre) => (
                <Button
                  key={genre.id}
                  className={`genre-item-btn ${selectedGenre === genre.id ? "active" : ""}`}
                  onClick={() => handleGenreClick(genre.id)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* 무비카드 */}
      <Col xs={12}>
        <Row className="gy-4 show-movie">
          {sortedMovies.map((movie, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={6}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
        {/* 페이지네이션 */}
        <div className="pagination-wrapper">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={
              data?.data.total_pages > 200 ? 200 : data?.data.total_pages || 1
            }
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            forcePage={page - 1}
          />
        </div>
      </Col>
    </Container>
  );
};

export default MoviePage;
