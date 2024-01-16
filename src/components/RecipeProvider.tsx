import { type ReactNode, createContext, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import useRecipes from '@/utils/hooks/use-recipes';
import Loading from '@/components/Loading';

export type RecipeContext = [number | null, (selectedIndex: number | null) => void];

export const RecipeContext = createContext<RecipeContext>([null, () => {}]);

export default function RecipeProvider({ children }: { children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { isPending, isError } = useRecipes();

  if (isError) {
    return (
      <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-center">
        <ExclamationCircleIcon className="h-10 w-10 text-red-600" aria-hidden="true" />
        <h1 className="font-light text-lg">
          There was an error. Please try again in a few moments.
        </h1>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <RecipeContext.Provider value={[selectedIndex, setSelectedIndex]}>
      {children}
    </RecipeContext.Provider>
  );
}
