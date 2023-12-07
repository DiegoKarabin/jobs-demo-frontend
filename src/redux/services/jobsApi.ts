import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Job } from '@/app/types/Job';
import { Page } from '@/app/types/pagination/Page';
import { Filter } from '@/app/types/Filter';
import { querystringify } from '@/app/utils';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://shy-cyan-capybara-cuff.cyclic.app/' }),
  endpoints: (builder) => ({
    getJobs: builder.query<Page<Job>, Filter>({
      query: (filter: Filter) => {
        const queryString = querystringify(filter);

        return `jobs${queryString ? `?${queryString}` : '' }`;
      }
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
