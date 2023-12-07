'use client';

import { useEffect, useState } from 'react';
import JobDescription from '@/app/components/JobDescription';
import { Job } from '@/app/types/Job';
import { useGetJobQuery } from '@/redux/services/jobsApi';

export default function ShowJobPage({ params }: { params: { id: number }}) {
  const [job, setJob] = useState<Job>({
    id: 0,
    title: '',
    description: '',
    salary: 0,
    level: '',
    created_at: new Date(),
  });
  const { data, isLoading, isError, isSuccess } = useGetJobQuery(+(params.id));

  useEffect(() => {
    setJob({
      id: data?.id as number,
      title: data?.title as string,
      description: data?.description as string,
      salary: +(data?.salary as unknown as number),
      level: data?.level as string,
      created_at: data?.created_at as Date,
    });
  }, [data]);

  return (
    <div className="grid grid-cols-12 xl:gap-10 gap-y-12 mt-8">
      <div className="col-span-12">
        <h3 className="text-2xl font-semibold">
          Job Offer detailed view
        </h3>
      </div>
      <div className="col-span-12">
        {isSuccess && (
          <JobDescription
          job={job}
          isLoading={isLoading}
          />
        )}
        {isError && (
          <p>An error ocurred.</p>
        )}
      </div>
    </div>
  );
}
