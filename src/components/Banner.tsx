import { getCountry } from '@/utils/country';
import useRecipe from '@/utils/hooks/use-recipe';

export default function Banner({ onAddRecipeClick }: { onAddRecipeClick: () => void }) {
  const { data: recipe, isPending, isError } = useRecipe();

  if (isError || isPending) {
    return null;
  }

  const country = getCountry(recipe.origin);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <span className="pr-2.5">{country?.flag}</span>
        <span className="font-styled font-medium text-sm">{recipe.name}</span>
      </div>

      <button className="bg-[#454A5F] rounded-md px-1.5 text-sm" onClick={onAddRecipeClick}>
        + Add recipe
      </button>
    </div>
  );
}
