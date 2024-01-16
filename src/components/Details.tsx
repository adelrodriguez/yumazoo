import useRecipe from '@/utils/hooks/use-recipe';

export default function Details() {
  const { data: recipe, isPending, isError } = useRecipe();

  if (isError || isPending) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 bg-[#131823] gap-x-6 gap-y-3 px-6 py-3 rounded-md">
      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Protein</h3>
        <p className="text-base leading-5 font-medium">{recipe.protein}</p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Produce</h3>
        <p className="text-base leading-5 font-medium">{recipe.produce}</p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Spices</h3>
        <p className="text-base leading-5 font-medium bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
          {recipe.spice}
        </p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Cooking Oil</h3>
        <p className="text-base leading-5 font-medium bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
          {recipe.cookingOil}
        </p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Volume/Weight</h3>
        <p className="text-base leading-5 font-medium">{recipe.volume}</p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Serves</h3>
        <p className="text-base leading-5 font-medium">{recipe.serves}</p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Authenticity</h3>
        <p className="text-base leading-5 font-medium bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
          {recipe.authenticity}
        </p>
      </div>

      <div>
        <h3 className="text-sm leading-6 text-[#737992]">Stock</h3>
        <p className="text-base leading-5 font-medium bg-gradient-to-r from-[#FFBF43] to-[#FF4869] inline-block bg-clip-text text-transparent">
          {recipe.stock}
        </p>
      </div>
    </div>
  );
}
