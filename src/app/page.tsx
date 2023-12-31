import JobsList from './components/JobsList';
import FilterForm from '@/app/components/FilterForm';
import Pagination from './components/Pagination';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="job-listing-section container mx-auto">
        <div className="grid grid-cols-12 xl:gap-10 gap-y-12">
          <div className="col-span-12">
            <div className="create-button-container flex flex-row-reverse">
              <Link
                href="/jobs/create"
                className='bg-blue-600 text-white p-2 text-lg rounded-md'
              >
                Create new job offer
              </Link>
            </div>
            <FilterForm />
            <JobsList />
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  )
}
