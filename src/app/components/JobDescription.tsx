import { useRouter } from 'next/navigation';
import { Job } from '../types/Job';
import JobItemSkeleton from './JobItemSkeleton';
import { useDeleteJobMutation } from '@/redux/services/jobsApi';
import Spinner from './Spinner';

export default function JobDescription({
  job,
  isLoading,
}: {
  job: Job,
  isLoading: boolean,
}) {
  const id = job.id;
  const router = useRouter();
  const [deleteJob, useDeleteJobMutationProperties] = useDeleteJobMutation();

  function handleUpdateClicked() {
    router.push(`/jobs/${id}/update`);
  }

  async function handleDeleteJob() {
    try {
      await deleteJob(id).unwrap();
      router.push('/');
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  return (
    <>
      {!isLoading && (
        <div className='relative'>
          <div className="grid gap-6 mb-6 grid-cols-1">
            <h4 className="text-3xl font-bold">{job.title}</h4>
            <p className="text-green-800 font-bold text-2xl">
              $ {job.salary}
            </p>
            <p>{job.description}</p>
            <p>
              Created at {new Date(job.created_at).toDateString()}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => { handleUpdateClicked() }}
                className="bg-blue-400 text-white border border-blue-500 hover:bg-blue-600 inline-block p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => { handleDeleteJob() }}
                className="bg-red-600 text-white border border-red-700 hover:bg-red-800 inline-block p-2 rounded-md"
              >
                Delete
              </button>
            </div>
            {useDeleteJobMutationProperties.isLoading && <Spinner />}
          </div>
        </div>
      )}
      {isLoading && (
        <JobItemSkeleton />
      )}
    </>
  );
}
