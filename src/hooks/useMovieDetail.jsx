import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}`);
};
export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    suspense: true,
  });
};
