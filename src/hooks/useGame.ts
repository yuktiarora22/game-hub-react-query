import { useQuery } from '@tanstack/react-query';
import { CACHE_GAME_KEY, TWENTY_FOUR_HOURS } from '../constants';
import gameService from '../services/game-service';

const useGame = (slug: string) => {
  return useQuery({
    queryKey: [...CACHE_GAME_KEY, slug],
    queryFn: () => gameService.get(slug),
    staleTime: TWENTY_FOUR_HOURS,
  });
};

export default useGame;
