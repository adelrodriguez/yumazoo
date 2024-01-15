import useRecipe from '@/utils/hooks/use-recipe';
import useRecipeContext from '@/utils/hooks/use-recipe-context';

export default function Details() {
  const [selectedIndex] = useRecipeContext();
  const { data, isPending, isError } = useRecipe(selectedIndex);

  console.log({ selectedIndex });

  if (!selectedIndex) {
    return null;
  }

  if (isError) {
    return <h1>There was an error</h1>;
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.name} {data.cookingOil}
    </div>
  );
}
