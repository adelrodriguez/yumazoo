import { API_URL } from '@/config/consts';
import { Recipe } from '@/types/recipe';
import { useQuery } from '@tanstack/react-query';

export default function useRecipe(index: number | null) {
  return useQuery({
    queryFn: async ({ signal }) => {
      const res = await fetch(API_URL + '/recipes/' + index, { signal });
      const data = (await res.json()) as { message: Recipe };

      return data.message;
    },
    queryKey: ['recipes', index],
    enabled: index !== null,
  });
}
