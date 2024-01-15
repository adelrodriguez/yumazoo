import { DifficultyLabel } from '@/types/recipe';
import useRecipe from '@/utils/hooks/use-recipe';
import useRecipeContext from '@/utils/hooks/use-recipe-context';

export default function Details() {
  const [selectedIndex] = useRecipeContext();
  const { data: recipe, isPending, isError } = useRecipe(selectedIndex);

  if (!selectedIndex) {
    return null;
  }

  // TODO(adelrodriguez): Add nicer error handling
  if (isError) {
    return <h1>There was an error</h1>;
  }

  // TODO(adelrodriguez): Add loading state
  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-md bg-[#131823]">
        <div className="bg-[#17CFC4] text-black py-3 px-5 rounded-md m-2.5 flex flex-col gap-4">
          <h2 className="text-lg leading-8 font-bold">
            Difficulty: {DifficultyLabel[recipe.difficulty]}
          </h2>
          <p className="text-base">{recipe.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 bg-[#131823] gap-x-6 gap-y-3 px-6 py-3 rounded-md">
        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Protein</h3>
          <p className="text-base leading-5">{recipe.protein}</p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Produce</h3>
          <p className="text-base leading-5">{recipe.produce}</p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Spices</h3>
          <p className="text-base leading-5 bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
            {recipe.spice}
          </p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Cooking Oil</h3>
          <p className="text-base leading-5 bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
            {recipe.cookingOil}
          </p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Volume/Weight</h3>
          <p className="text-base leading-5">{recipe.volume}</p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Serves</h3>
          <p className="text-base leading-5">{recipe.serves}</p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Authenticity</h3>
          <p className="text-base leading-5 bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
            {recipe.authenticity}
          </p>
        </div>

        <div>
          <h3 className="text-sm leading-6 text-[#737992]">Stock</h3>
          <p className="text-base leading-5 bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
            {recipe.stock}
          </p>
        </div>
      </div>
    </div>
  );
}
