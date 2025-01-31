import React, { useEffect } from 'react';
import { getNowPlayingMovies } from '../services/tmdbapi';

export const Home = () => {
  useEffect(() => {
    getNowPlayingMovies().then((result) => {
      console.log(result);
    });
  });

  return <div className="bg-dodgerblue">Home</div>;
};
