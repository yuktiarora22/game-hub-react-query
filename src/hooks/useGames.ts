import { useInfiniteQuery } from "@tanstack/react-query";
import { CACHE_GAMES_KEY, ONE_MINUTE } from "../constants";
import gameService, { Game } from "../services/game-service";
import { Genre } from "../services/genre-service";
import { FetchResponse } from "../services/http-service";
import { Platform } from "../services/platform-service";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

const useGames = (gameQuery: GameQuery) => {
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: [...CACHE_GAMES_KEY, gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      gameService.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    staleTime: ONE_MINUTE,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
