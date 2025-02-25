import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../redux/slice/searchSlice';
import { SkeletonHero } from './SkeletonHero';

export const Hero = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, []);

  return (
    <div className="theme-switch -mt-5 relative pb-10 ">
      {isLoading && <SkeletonHero />}
      {!isLoading && (
        <div
          className="flex flex-col justify-center items-center w-full h-[400px]"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1950px 1200px',
            backgroundPosition: '30% 25%',
            backdropFilter: 'blur(50px)',
            backgroundPositionX: 'center',
          }}
        >
          <div className="absolute top-0 left-0 right-0 bg-jet/80 z-10 h-[400px]"></div>
          <div className="lg:w-1/3 md:w-1/2 w-full z-10 px-5 md:px-0">
            <p className="text-4xl font-semibold text-seasalt">Welcome,</p>
            <p className="text-xl text-seasalt">Millions of movies, TV shows to discover. Explore now.</p>
          </div>
          <div className="z-10 px-5 md:px-0 lg:w-1/3 md:w-1/2 w-full">
            <div onClick={() => dispatch(changeStatus())} className=" cursor-pointer p-3 mt-5 dark:border-seasalt/10 border-onyx/10 rounded-lg bg-purewhite dark:bg-onyx  flex justify-between items-center">
              <p className="dark:text-seasalt">Search any movie...</p>
              <p className="p-1 bg-seasalt dark:bg-jet rounded-lg text-xs">CTRL+K</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
