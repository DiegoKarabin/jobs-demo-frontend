'use client';

import { SubmitHandler } from 'react-hook-form';
import JobsForm from '@/app/components/JobsForm';
import { JobFormFields } from '@/app/types/JobFormFields';
import { useGetJobQuery, useUpdateJobMutation } from '@/redux/services/jobsApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UpdateJobPage({ params }: { params: { id: number }}) {
  const router = useRouter();
  const [jobFormFields, setJobsFormFields] = useState<JobFormFields>({
    title: '',
    description: '',
    salary: 0,
    level: ''
  });
  const [updateJob, useUpdateJobMutationProps] = useUpdateJobMutation();
  const { data, isLoading } = useGetJobQuery(+(params.id));

  useEffect(() => {
    setJobsFormFields({
      title: data?.title as string,
      description: data?.description as string,
      salary: +(data?.salary as unknown as number),
      level: data?.level as string,
    });
  }, [data]);

  const handleJobUpdate: SubmitHandler<JobFormFields> = async (data) => {
    try {
      await updateJob({ ...data, salary: +(data.salary), id: +(params.id) }).unwrap();
      router.push('/');
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  return (
    <div className="grid grid-cols-12 xl:gap-10 gap-y-12 mt-8">
      <div className="col-span-12">
        <h3 className="text-2xl font-semibold">
          Update Job Offer
        </h3>
      </div>
      <div className="col-span-12">
        <JobsForm job={jobFormFields} onSubmit={handleJobUpdate} isLoading={isLoading || useUpdateJobMutationProps.isLoading} />
      </div>
    </div>
  );
}
