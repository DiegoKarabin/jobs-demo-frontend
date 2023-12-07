'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import PaginationButton from './PaginationButton';
import { Filter } from '../types/Filter';
import { setFilter } from '@/redux/features/filterSlice';
import type { PageMetaData } from '../types/pagination/PageMetaData';
import { ChangeEvent } from 'react';
import { useGetJobsQuery } from '@/redux/services/jobsApi';

export default function Pagination() {
  const filter: Filter = useAppSelector((state) => state.filterReducer.filter);
  const { data } = useGetJobsQuery(filter);
  const dispatch = useAppDispatch();

  const currentPage = filter.page;
  const currentSize = filter.size;
  const pageMetaData = data?.meta as PageMetaData;
  const totalPages = pageMetaData?.totalPages;

  const disablePrevButtons = currentPage == 1;
  const disableNextButtons = currentPage >= totalPages;

  function pageButtons() {
    const pagesToShow = 5;
    const pagesToShowMiddle = Math.ceil(pagesToShow / 2);
    const startPage = currentPage <= pagesToShowMiddle ? 1 : currentPage - pagesToShowMiddle + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    const pagesNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pagesNumbers.push(i);
    }

    return pagesNumbers.map((pageNumber: number) => {
      const active = pageNumber == currentPage;

      return (
        <PaginationButton
          key={pageNumber}
          active={active}
          onClick={() => { goToPage(pageNumber) }}
        >
          {pageNumber}
        </PaginationButton>
      );
    });
  }

  function goToPage(page: number) {
    const newFilter: Filter = {
      ...filter,
      page: page
    };

    dispatch(setFilter(newFilter));
  }

  function changePageSize(event: ChangeEvent<HTMLInputElement>) {
    const newFilter: Filter = {
      ...filter,
      size: +(event.currentTarget.value),
      page: 1,
    };

    dispatch(setFilter(newFilter));
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <div className="flex justify-center gap-2 mt-8">
          <PaginationButton disabled={disablePrevButtons} onClick={() => { goToPage(1) }}>
            &lt;
            &lt;
          </PaginationButton>
          <PaginationButton disabled={disablePrevButtons} onClick={() => { goToPage(currentPage - 1) }}>
            &lt;
          </PaginationButton>
          {pageButtons()}
          <PaginationButton disabled={disableNextButtons} onClick={() => { goToPage(currentPage + 1) }}>
            &gt;
          </PaginationButton>
          <PaginationButton disabled={disableNextButtons} onClick={() => { goToPage(totalPages) }}>
            &gt;
            &gt;
          </PaginationButton>
          <p className="py-3 pl-3">Page size</p>
          <input className="w-14 p-2" type="number" value={currentSize} onChange={changePageSize} />
        </div>
      </div>
    </div>
  );
}
