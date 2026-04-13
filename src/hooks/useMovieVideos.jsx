import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieVideos = (id) => {
  return api.get(`/movie/${id}/videos`);
};
export const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ["movie-videos", id],
    queryFn: () => fetchMovieVideos(id),
    suspense: true,
  });
};
