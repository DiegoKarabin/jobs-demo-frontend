import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Job } from '@/app/types/Job';
import { Page } from '@/app/types/pagination/Page';
import { Filter } from '@/app/types/Filter';
import { querystringify } from '@/app/utils';
import { JobFormFields } from '@/app/types/JobFormFields';

const API_URL = process.env.API_URL;
const BASE_ENDPOINT = 'jobs';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobs: builder.query<Page<Job>, Filter>({
      query: (filter: Filter) => {
        const queryString = querystringify(filter);

        return `${BASE_ENDPOINT}${queryString ? `?${queryString}` : '' }`;
      },
      providesTags: (result) =>
        result?.items
          ? [
            ...result.items.map(({id}) => ({ type: 'Jobs', id } as const)),
            { type: 'Jobs', id: 'LIST' },
          ]
          : [{ type: 'Jobs', id: 'LIST' }],
    }),
    getJob: builder.query<Job, number>({
      query: (id: number) => `${BASE_ENDPOINT}/${id}`,
      providesTags: (_, __, id) => [{ type: 'Jobs', id }],
    }),
    createJob: builder.mutation<Job, JobFormFields>({
      query: (body: JobFormFields) => ({
        url: BASE_ENDPOINT,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    updateJob: builder.mutation<Job, JobFormFields & Pick<Job, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `${BASE_ENDPOINT}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Jobs', id }],
    }),
    deleteJob: builder.mutation<any, number>({
      query: (id: number) => ({
        url: `${BASE_ENDPOINT}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Jobs', id }],
    })
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation
} = jobsApi;
