import useRecipes from '@/utils/hooks/use-recipes';
import { type ReactNode, createContext, useState, useEffect } from 'react';

export type RecipeContext = [number | null, (selectedIndex: number | null) => void];

export const RecipeContext = createContext<RecipeContext>([null, () => {}]);

export default function RecipeProvider({ children }: { children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { data: recipes, isPending, isError } = useRecipes();

  // TODO(adelrodriguez): remove this useEffect
  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);

  if (isError) {
    // TODO(adelrodriguez): Add nicer error handling
    return <h1>There was an error</h1>;
  }

  if (isPending) {
    // TODO(adelrodriguez): Add loading state
    return <h1>Loading...</h1>;
  }

  return (
    <RecipeContext.Provider value={[selectedIndex, setSelectedIndex]}>
      <div>
        Total recipe number: <span>{recipes.length}</span>
      </div>
      {children}
    </RecipeContext.Provider>
  );
}
