import React from 'react';
import { rubik } from '../fonts';
import type { Job } from '../types/Job';

export default function JobItem({ job }: { job: Job }) {
  return (
    <>
      <div className='overflow-hidden bg-white border rounded-md shadow-lg shadow-gray-200/20 border-slate-300 hover:border-violet-500 hover:-translate-y-2 transition-all duration-500 ease-in-out'>
        <div className='p-6'>
          <h5 className={`${rubik.className} text-2xl`}>
            {job.title}
          </h5>
          <p className='text-green-800 font-bold text-xl pt-1'>
            {job.salary}
          </p>
          <p className='pt-1 font-semibold'>
            {job.level}
          </p>
          <p className='text-gray-600 text-lg pt-1'>
            {job.description}
          </p>
          <p className='pt-2 text-right'>
            {new Date(job.created_at).toDateString()}
          </p>
        </div>
      </div>
    </>
  );
}
