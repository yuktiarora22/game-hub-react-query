import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { CACHE_GAMES_KEY, ONE_MINUTE } from "../constants";
import gameService, { Game } from "../services/game-service";
import { FetchResponse } from "../services/http-service";

const useGames = (gameQuery: GameQuery) => {
  const fetchGames = () =>
    gameService.getAll({
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    });

  return useQuery<FetchResponse<Game>, Error>({
    queryKey: CACHE_GAMES_KEY,
    queryFn: fetchGames,
    staleTime: ONE_MINUTE,
  });
};

export default useGames;
