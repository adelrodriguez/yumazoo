import { API_URL } from '@/config/consts';
import { Recipe } from '@/types/recipe';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function useRecipes() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async ({ signal }) => {
      const res = await fetch(API_URL + '/recipes/', { signal });
      const data = (await res.json()) as { message: Recipe[] };

      // Map over the recipes and set them in the cache so we can quickly
      // retrieve them later
      data.message.forEach((recipe, index) => {
        queryClient.setQueryData(['recipes', index], recipe);
      });

      return data.message;
    },
    queryKey: ['recipes'],
  });
}
