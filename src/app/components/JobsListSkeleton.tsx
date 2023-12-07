import { useAppSelector } from "@/redux/hooks";
import JobItemSkeleton from "./JobItemSkeleton";

export function JobsListSkeleton() {
  const filter = useAppSelector((state) => state.filterReducer.filter);

  function jobItemSkeletonsToShow() {
    const jobItemSkeletons = [];

    for (let i = 0; i < filter.size; i++) {
      jobItemSkeletons.push(<JobItemSkeleton />);
    }

    return jobItemSkeletons;
  }

  return (
    <div className="space-y-8 mt-14">
      {jobItemSkeletonsToShow()}
    </div>
  );
}
