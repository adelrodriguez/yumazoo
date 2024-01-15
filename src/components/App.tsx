import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RecipeProvider from '@/components/RecipeProvider';
import SearchBar from '@/components/SearchBar';
import Details from '@/components/Details';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="text-white h-[630px] w-[410px] p-6">
        <RecipeProvider>
          <SearchBar />
          <Details />
        </RecipeProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
