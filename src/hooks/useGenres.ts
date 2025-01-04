import { useQuery } from "@tanstack/react-query";
import { CACHE_GENRES_KEY, TWENTY_FOUR_HOURS } from "../constants";
import genres from "../data/genres";
import genreService from "../services/genre-service";

const useGenres = () =>
  useQuery({
    queryKey: CACHE_GENRES_KEY,
    queryFn: genreService.getAll,
    staleTime: TWENTY_FOUR_HOURS,
    initialData: genres,
  });

export default useGenres;
