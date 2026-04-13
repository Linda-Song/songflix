import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genreId }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  }
  if (genreId) {
    return api.get(`/discover/movie?with_genres=${genreId}&page=${page}`);
  }
  return api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, genreId }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, genreId }),
    suspense: true,
  });
};
