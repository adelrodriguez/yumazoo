import { difficultyLabels } from '@/types/recipe';
import useRecipe from '@/utils/hooks/use-recipe';

export default function Description() {
  const { data: recipe, isPending, isError } = useRecipe();

  if (isError || isPending) {
    return null;
  }

  return (
    <div className="rounded-md bg-[#131823] p-2.5">
      <div className="bg-[#17CFC4] text-black py-3 px-5 rounded-md flex flex-col gap-4">
        <h2 className="text-lg leading-8 font-bold">
          Difficulty: {difficultyLabels[recipe.difficulty]}
        </h2>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
}
