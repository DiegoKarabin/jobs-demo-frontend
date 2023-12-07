'use client';

import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFilter } from '@/redux/features/filterSlice';
import { Filter } from '../types/Filter';

export default function FilterForm() {
  // Redux hooks
  const filter = useAppSelector((state) => state.filterReducer.filter);
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;
    const searchHasChanged = filter.search !== search;

    const newFilter: Filter = {
      ...filter,
      search,
      min_salary: +(formData.get('min_salary') as unknown as number),
      max_salary: +(formData.get('max_salary') as unknown as number),
      level: formData.get('level') as string,
      sort_field: formData.get('sort_field') as string,
      sort_direction: formData.get('sort_direction') as string,
      page: searchHasChanged ? 1 : filter.page
    };

    dispatch(setFilter(newFilter));
  }

  return (
    <>
      <div className="filter-form-container">
        <form action="#" onSubmit={handleSubmit}>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-12'>
              <input
                type="search"
                name="search"
                className="w-full p-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                placeholder="Search term"
              />
            </div>
            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <input
                type="number"
                name="min_salary"
                placeholder='Min salary'
                min={1}
                className='w-full p-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
              />
            </div>
            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <input
                type="number"
                name="max_salary"
                placeholder='Max salary'
                min={1}
                className='w-full p-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
              />
            </div>
            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <select
                name="level"
                className='w-full p-3 text-lg bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                defaultValue={''}
              >
                <option value="">
                  Level
                </option>
                <option value="Entry Level">
                  Entry Level
                </option>
                <option value="Junior">
                  Junior
                </option>
                <option value="Mid Level">
                  Mid Level
                </option>
                <option value="Senior">
                  Senior
                </option>
                <option value="Expert">
                  Expert
                </option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <select
                name="sort_field"
                className='w-full p-3 text-lg bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                defaultValue={''}
              >
                <option value="">
                  Sort by
                </option>
                <option value="salary">
                  Salary
                </option>
                <option value="created_at">
                  Creation date
                </option>
              </select>
            </div>
            <div className='col-span-12 md:col-span-3 lg:col-span-2'>
              <select
                name="sort_direction"
                className='w-full p-3 text-lg bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                defaultValue={''}
              >
                <option value="" hidden>
                  Sort direction
                </option>
                <option value="asc">
                  Ascending
                </option>
                <option value="desc">
                  Descending
                </option>
              </select>
            </div>
            <div className='col-span-12 lg:col-span-2'>
              <button
                type="submit"
                className='w-full p-2 text-white text-lg bg-violet-700 rounded-md hover:bg-violet-500'
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
