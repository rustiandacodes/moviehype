import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardMovieSkeleton = (props) => {
  const { length, type } = props;
  return Array(length)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="bg-purewhite dark:bg-onyx shadow rounded-lg cursor-pointer hover:scale-105 transition duration-300 overflow-hidden">
        <div className="-mt-1">
          <Skeleton height={210} />
        </div>
        <div className="p-2">
          <Skeleton />
          {type === 'artist' ? '' : <Skeleton />}
        </div>
      </div>
    ));
};

export default CardMovieSkeleton;
