import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddRecipeForm from '@/components/AddRecipeForm';
import Banner from '@/components/Banner';
import Description from '@/components/Description';
import Details from '@/components/Details';
import RecipeProvider from '@/components/RecipeProvider';
import SearchBar from '@/components/SearchBar';

const queryClient = new QueryClient();

export default function App() {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="text-white h-[630px] w-[410px] m-auto p-6 font-ui">
        <RecipeProvider>
          <div className="flex flex-col gap-y-6">
            {showAddRecipeForm ? (
              <AddRecipeForm onBackClick={() => setShowAddRecipeForm(false)} />
            ) : (
              <>
                <SearchBar />
                <Banner onAddRecipeClick={() => setShowAddRecipeForm(true)} />
                <Description />
                <Details />
              </>
            )}
          </div>
        </RecipeProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
