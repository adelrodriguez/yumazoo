import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import clsx from 'clsx';
import { getCountry } from '@/utils/country';
import useRecipeContext from '@/utils/hooks/use-recipe-context';
import useRecipes from '@/utils/hooks/use-recipes';
import { Difficulty, difficultyLabels } from '@/types/recipe';

const difficultyColor = {
  [Difficulty.Easy]: '#6CF600',
  [Difficulty.Medium]: '#F63B00',
  [Difficulty.Hard]: '#FF003D',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useRecipeContext();
  const { data, isPending, isError } = useRecipes();
  const filteredRecipes =
    query === ''
      ? []
      : data?.filter((recipe) => recipe.name.toLowerCase().includes(query.toLowerCase())) ?? [];

  if (isError || isPending) {
    return null;
  }

  return (
    <Combobox
      value={selectedIndex ? data[selectedIndex] : null}
      onChange={(v) => {
        const index = data.findIndex(
          (recipe) => recipe.name === v!.name && recipe.origin === v!.origin
        );
        setSelectedIndex(index);
        setQuery('');
      }}
    >
      <div className="relative mt-1">
        <div
          className={clsx(
            'relative w-full overflow-hidden rounded-md bg-[#0D1119] border-0 ring-1 ring-inset ring-[#5B6178] text-white shadow-md',
            'placeholder:text-[#737992] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#B89FFF] focus-within:ring-[#663CDD]'
          )}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <Combobox.Input
            className="w-full py-2 pl-10 pr-3 text-sm leading-5 bg-transparent rounded-md focus:outline-none"
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
                  <div className="flex hover:bg-[#181F30] py-1.5 px-3 rounded-md justify-between items-center">
                    <div className="flex">
                      <span className="pr-1.5 w-6 h-6">{getCountry(recipe.origin)?.flag}</span>
                      <span className="block truncate">{recipe.name}</span>
                    </div>

                    <div className="flex justify-end items-center">
                      <svg
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1.5"
                      >
                        <path
                          d="M0.5 12V0H12.5V5.5L6 12H0.5Z"
                          fill={difficultyColor[recipe.difficulty]}
                        />
                      </svg>
                      <span className="font-styled text-sm font-bold">
                        {difficultyLabels[recipe.difficulty]}
                      </span>
                    </div>
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
