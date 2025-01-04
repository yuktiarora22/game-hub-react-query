import { useQuery } from "@tanstack/react-query";
import { CACHE_PLATFORMS_KEY, TWENTY_FOUR_HOURS } from "../constants";
import platforms from "../data/platforms";
import platformService from "../services/platform-service";

const usePlatforms = () =>
  useQuery({
    queryKey: CACHE_PLATFORMS_KEY,
    queryFn: platformService.getAll,
    staleTime: TWENTY_FOUR_HOURS,
    initialData: platforms,
  });

export default usePlatforms;
