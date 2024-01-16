import countries from '@/config/countries';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Authenticity, Difficulty, Recipe, difficultyLabels } from '@/types/recipe';
import clsx from 'clsx';
import { API_URL } from '@/config/consts';
import { ReactNode } from 'react';
import Loading from '@/components/Loading';

export default function AddRecipeForm({ onBackClick }: { onBackClick: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Recipe>();

  const mutation = useMutation({
    mutationFn: async (newRecipe: Recipe) => {
      const response = await fetch(API_URL + '/recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      return response.json();
    },
    onSuccess() {
      onBackClick();
    },
  });

  return (
    <div>
      <div className="flex pb-4 border-b border-[#2E3347] gap-x-2.5">
        <button onClick={onBackClick}>
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-lg leading-6 font-styled font-bold">Add new recipe</h1>
      </div>

      <form
        className="grid grid-cols-2 gap-y-6 gap-x-3 py-6"
        onSubmit={handleSubmit((data) =>
          mutation.mutate({
            name: data.name,
            origin: data.origin,
            description: data.description,
            difficulty: data.difficulty,
            protein: data.protein,
            produce: data.produce,
            spice: data.spice,
            cookingOil: data.cookingOil,
            volume: data.volume,
            authenticity: data.authenticity,
            stock: data.stock,
            serves: data.serves,
          })
        )}
      >
        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="name" className="font-styled leading-5">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            type="text"
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.name && <Error>Name is required</Error>}
        </div>

        <div className="flex flex-col min-w-0 gap-y-2.5">
          <label htmlFor="origin" className="font-styled leading-5">
            Origin
          </label>
          <select
            {...register('origin', { required: true })}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5 h-10',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
          {errors.origin && <Error>Origin is required</Error>}
        </div>

        <div className="flex flex-col col-span-2 gap-y-2.5">
          <label htmlFor="description" className="font-styled leading-5">
            Description
          </label>
          <textarea
            {...register('description', { required: true, maxLength: 200 })}
            placeholder="Describe your recipe..."
            maxLength={200}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          <span className="font-styled text-sm leading-6 text-[#43495E]">
            {watch('description')?.length ?? 0} / 200 characters
          </span>
          {errors.description && <Error>Description is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            {...register('difficulty', { required: true })}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          >
            <option value={Difficulty.Easy}>{difficultyLabels[Difficulty.Easy]}</option>
            <option value={Difficulty.Medium}>{difficultyLabels[Difficulty.Medium]}</option>
            <option value={Difficulty.Hard}>{difficultyLabels[Difficulty.Hard]}</option>
          </select>
          {errors.difficulty && <Error>Difficulty is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="protein">Protein</label>
          <input
            {...register('protein', { required: true })}
            type="text"
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.protein && <Error>Protein is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="produce">Produce</label>
          <input
            {...register('produce', { required: true, maxLength: 15 })}
            type="text"
            maxLength={15}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.produce && <Error>Produce is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="spice">Spice</label>
          <input
            {...register('spice', { required: true, maxLength: 15 })}
            type="text"
            maxLength={15}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.spice && <Error>Spice is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="cookingOil">Cooking Oil?</label>
          <input
            {...register('cookingOil', { required: true })}
            type="text"
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.cookingOil && <Error>Cooking oil is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="volume">Volume</label>
          <div className="relative">
            <input
              {...register('volume', { required: true, min: 1 })}
              type="number"
              min="1"
              className={clsx(
                'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 pl-5 pr-20  w-full',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-styled text-[#E9EAF6] sm:text-sm" id="price-currency">
                grams
              </span>
            </div>
          </div>
          {errors.volume && <Error>Volume is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="serves">Serves</label>
          <div className="relative">
            <input
              {...register('serves', { required: true, min: 1 })}
              min="1"
              type="number"
              className={clsx(
                'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 pl-5 pr-20 w-full',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-styled text-[#E9EAF6] sm:text-sm" id="price-currency">
                people
              </span>
            </div>
          </div>
          {errors.serves && <Error>Serves is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5">
          <label htmlFor="authenticity">Authenticity</label>
          <select
            {...register('authenticity', { required: true })}
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          >
            <option>{Authenticity.Unverified}</option>
            <option>{Authenticity.Verified}</option>
          </select>
          {errors.authenticity && <Error>Authenticity is required</Error>}
        </div>

        <div className="flex flex-col gap-y-2.5 col-span-2">
          <label htmlFor="stock">Stock</label>
          <input
            {...register('stock', { required: true })}
            type="text"
            className={clsx(
              'bg-[#181F30] border-0 ring-1 ring-inset ring-[#5B6178] text-white rounded-md py-2 px-5',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#B89FFF] focus:ring-[#663CDD]'
            )}
          />
          {errors.stock && <Error>Stock is required</Error>}
        </div>

        <button
          type="submit"
          className="col-span-2 bg-[#764AF4] rounded-md py-2 font-styled disabled:opacity-40"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center justify-center">
              <Loading className="h-4 w-4" />
              Adding...
            </div>
          ) : (
            'Add recipe'
          )}
        </button>
      </form>
    </div>
  );
}

function Error({ children }: { children: ReactNode }) {
  return <span className="font-styled text-sm leading-6 text-red-600">{children}</span>;
}
