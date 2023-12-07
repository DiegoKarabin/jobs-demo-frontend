'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { JobFormFields } from '../types/JobFormFields';
import Spinner from './Spinner';
import { useEffect } from 'react';

export default function JobsForm({
  job,
  isLoading,
  onSubmit
}: {
  job: JobFormFields,
  isLoading: boolean,
  onSubmit: SubmitHandler<JobFormFields>
}) {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<JobFormFields>();

  useEffect(() => {
    setValue('title', job.title ?? '');
    setValue('description', job.description ?? '');
    setValue('salary', job.salary ?? 0);
    setValue('level', job.level ?? '');
  }, [job, setValue]);

  function dynamicLabelClasses(hasErrors: any) {
    if (!!hasErrors) {
      return 'text-red-700';
    }

    return 'text-gray-900';
  }

  function dynamicInputClasses(hasErrors: any) {
    if (!!hasErrors) {
      return 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500';
    }

    return 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';
  }

  return (
    <div className='form-container relative p-4'>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 grid-cols-1">
          <div>
            <label
              htmlFor="title"
              className={`block mb-2 text-lg font-medium ${dynamicLabelClasses(errors.title)}`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className={
                `text-lg rounded-lg block w-full p-2.5 ${dynamicInputClasses(errors.title)}`
              }
              placeholder="Full stack developer"
              {...register('title', { required: true, maxLength: 30 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <p className="mt-2 text-sm text-red-600">
                A title is required
              </p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p className="mt-2 text-sm text-red-600">
                The max length for title is 30 characters
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className={`block mb-2 text-lg font-medium ${dynamicLabelClasses(errors.description)}`}
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Some description"
              className={`text-lg rounded-lg block w-full p-2.5 resize-none ${dynamicInputClasses(errors.description)}`}
              {...register('description', { required: true, maxLength: 100 })}
            ></textarea>
            {errors.description && errors.description.type === 'required' && (
              <p className="mt-2 text-sm text-red-600">
                A description is required
              </p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p className="mt-2 text-sm text-red-600">
                The max length for description is 100 characters
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="salary"
              className={`block mb-2 text-lg font-medium ${dynamicLabelClasses(errors.salary)}`}
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              placeholder="Please enter a number"
              className={`text-lg rounded-lg block w-full p-2.5 ${dynamicInputClasses(errors.salary)}`}
              {...register('salary', { required: true, min: 1 })}
            />
            {errors.salary && errors.salary.type === 'required' && (
              <p className="mt-2 text-sm text-red-600">
                A salary is required
              </p>
            )}
            {errors.salary && errors.salary.type === 'min' && (
              <p className="mt-2 text-sm text-red-600">
                Enter a positive value
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="level"
              className={`block mb-2 text-lg font-medium ${dynamicLabelClasses(errors.level)}`}
            >
              Level
            </label>
            <select
              id="level"
              className={`text-lg rounded-lgblock w-full p-2.5 ${dynamicInputClasses(errors.level)}`}
              {...register('level', { required: true })}
            >
              <option value="" hidden>
                Select the required level
              </option>
              <option value="Entry Level">
                Entry Level
              </option>
              <option value="Junior">
                Junior
              </option>
              <option value="Mid-Level">
                Mid-Level
              </option>
              <option value="Senior">
                Senior
              </option>
              <option value="Expert">
                Expert
              </option>
            </select>
            {errors.title && errors.title.type === 'required' && (
              <p className="mt-2 text-sm text-red-600">
                Please select the required level
              </p>
            )}
          </div>
          <div className="space-x-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save
            </button>

            <Link
              href="/"
              className="inline-block bg-gray-300 border border-gray-500 hover:bg-gray-400 rounded-md px-5 py-2.5"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {isLoading && <Spinner />}
    </div>
  );
}
