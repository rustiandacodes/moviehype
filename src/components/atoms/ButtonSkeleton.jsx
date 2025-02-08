import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const ButtonSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="md:w-xs w-full">
        <Skeleton height={35} />
      </div>
    </div>
  );
};
