import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopMovieSlide from "./components/TopMovieSlide/TopMovieSlide";
import "./Homepage.style.css";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import "./Homepage.style.css";

// 1. 배너 => popular 영화 --> 첫번째 아이템 보여주기
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <div className="home-slides">
        <PopularMovieSlide />
        <TopMovieSlide />
        <UpcomingMovieSlide />
      </div>
    </div>
  );
};

export default Homepage;
