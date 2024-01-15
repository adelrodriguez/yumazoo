import { RecipeContext } from '@/components/RecipeProvider';
import { useContext } from 'react';

export default function useRecipeContext() {
  const context = useContext(RecipeContext);

  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }

  return context;
}
