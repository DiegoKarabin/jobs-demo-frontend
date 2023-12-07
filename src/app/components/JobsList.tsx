'use client';

import { useGetJobsQuery } from '@/redux/services/jobsApi';
import JobItem from './JobItem';
import { useAppSelector } from '@/redux/hooks';
import { JobsListSkeleton } from './JobsListSkeleton';

export default function JobsList() {
  const filter = useAppSelector((state) => state.filterReducer.filter);
  const { data, isLoading, isFetching } = useGetJobsQuery(filter);

  if (isLoading || isFetching) {
    return <JobsListSkeleton />
  }

  return (
    <>
      <div className="space-y-8 mt-14">
        {data?.items?.map((job) => <JobItem key={job.id} job={job} />)}
      </div>
    </>
  );
}
