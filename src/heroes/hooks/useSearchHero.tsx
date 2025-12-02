import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "../actions/search-hero.action";

export const useSearchHero = (name:string, strength:string) => {
  return useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroAction({ name, strength }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
