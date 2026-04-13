import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieRec = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};
export const useMovieRecQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommendations", id],
    queryFn: () => fetchMovieRec(id),
    suspense: true,
  });
};
