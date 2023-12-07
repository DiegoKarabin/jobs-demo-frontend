'use client';

import { SubmitHandler } from 'react-hook-form';
import JobsForm from '@/app/components/JobsForm';
import { JobFormFields } from '@/app/types/JobFormFields';
import { useCreateJobMutation } from '@/redux/services/jobsApi';
import { useRouter } from 'next/navigation';

export default function CreateJobPage() {
  const newJob: JobFormFields = {
    title: '',
    description: '',
    salary: 0,
    level: '',
  };
  const [addJob, { isLoading }] = useCreateJobMutation();
  const router = useRouter();

  const handleJobCreation: SubmitHandler<JobFormFields> = async (data) => {
    try {
      await addJob({ ...data, salary: +(data.salary) }).unwrap();
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
          Create Job Offer
        </h3>
      </div>
      <div className="col-span-12">
        <JobsForm job={newJob} onSubmit={handleJobCreation} isLoading={isLoading} />
      </div>
    </div>
  );
}
