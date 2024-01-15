import { Combobox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import clsx from 'clsx';
import { getCountry } from '@/utils/country';
import useRecipeContext from '@/utils/hooks/use-recipe-context';
import useRecipes from '@/utils/hooks/use-recipes';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useRecipeContext();
  const { data, isPending, isError } = useRecipes();
  const filteredRecipes =
    query === ''
      ? []
      : data?.filter((recipe) => recipe.name.toLowerCase().includes(query.toLowerCase())) ?? [];

  // TODO(adelrodriguez): Add nicer error handling
  if (isError) {
    return <h1>There was an error</h1>;
  }

  // TODO(adelrodriguez): Add loading state
  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <Combobox
      value={selectedIndex ? data[selectedIndex] : null}
      onChange={(v) => {
        const index = data.findIndex((recipe) => recipe.name === v!.name);
        setSelectedIndex(index);
        setQuery('');
      }}
    >
      <div className="relative mt-1">
        <div className="relative w-full overflow-hidden rounded-md bg-[#0D1119] border border-[#5B6178] text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset--2 focus-visible:ring-offset-teal-300 placeholder:text-[#737992]">
          <Combobox.Input
            className="w-full py-2 px-3 text-sm leading-5 bg-transparent rounded-md"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cuisine"
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className={clsx(
              'absolute mt-3 max-h-60 w-full overflow-auto rounded-md bg-[#121826] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none',
              {
                hidden: query === '',
              }
            )}
          >
            {filteredRecipes.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-3 py-3.5 text-white font-styled">
                Nothing found.
              </div>
            ) : (
              filteredRecipes.map((recipe, index) => (
                <Combobox.Option
                  key={index}
                  className="relative cursor-default select-none p-2 text-white font-styled"
                  value={recipe}
                >
                  <div className="flex hover:bg-[#181F30] py-1.5 px-3 rounded-md">
                    <span className="pr-1.5 w-6 h-6">{getCountry(recipe.origin)?.flag}</span>
                    <span className="block truncate">{recipe.name}</span>
                  </div>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
