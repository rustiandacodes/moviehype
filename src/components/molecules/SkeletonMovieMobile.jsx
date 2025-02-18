import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonMovieMobile = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:gap-10 gap-3 md:container mx-auto">
      <Skeleton height={410} width={420} />
      <div className="px-5 text-jet dark:text-seasalt">
        <Skeleton width={370} height={30} className="mb-2" />
        <Skeleton className="mb-3" width={370} />
        <Skeleton className="mb-3" />
        <Skeleton className="mb-3" width={300} />
        <Skeleton count={3} width={370} />
        <div className="flex items-center gap-3 my-5">
          <Skeleton width={75} height={75} circle />
          <div>
            <Skeleton className="mb-2" width={100} />
            <Skeleton className="mb-3" width={50} />
          </div>
        </div>
        <Skeleton width={370} height={40} className="mt-2" />
      </div>
    </div>
  );
};
