import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../redux/slice/searchSlice';
import { getPopularMovies } from '../../services/tmdbapi';

export const Hero = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState('');

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 20);
    getPopularMovies().then((res) => {
      setImage(import.meta.env.VITE_BASE_IMG_URL + res[randomNum].backdrop_path);
    });
  }, []);

  console.log(image);

  return (
    <div className="theme-switch -mt-5 relative ">
      <div className="flex flex-col justify-center items-center w-full h-[400px]" style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '1950px 1100px', backgroundPosition: '20% 15%' }}>
        <div className="absolute top-0 left-0 right-0 bg-red-500/40 z-10 h-[400px]"></div>
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
    </div>
  );
};
