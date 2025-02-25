import Skeleton from 'react-loading-skeleton';

export const SkeletonHero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[400px] bg-purewhite dark:bg-onyx">
      <div className="lg:w-1/3 md:w-1/2 w-full z-10 px-5 md:px-0">
        <Skeleton width={200} height={40} className="mb-1" />
        <Skeleton height={20} />
        <Skeleton height={20} className="mb-3" />
      </div>
      <div className="z-10 px-5 md:px-0 lg:w-1/3 md:w-1/2 w-full">
        <Skeleton height={45} />
      </div>
    </div>
  );
};
