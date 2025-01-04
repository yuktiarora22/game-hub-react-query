import { useInfiniteQuery } from "@tanstack/react-query";
import { CACHE_GAMES_KEY, TWENTY_FOUR_HOURS } from "../constants";
import gameService, { Game } from "../services/game-service";
import { FetchResponse } from "../services/http-service";

export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder: string;
  searchText: string;
}

const useGames = (gameQuery: GameQuery) => {
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: [...CACHE_GAMES_KEY, gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      gameService.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    staleTime: TWENTY_FOUR_HOURS,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
