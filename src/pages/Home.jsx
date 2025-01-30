import React, { useEffect } from 'react';
import { genres } from '../utils/genres';
import { getNowPlayingMovies } from '../services/tmdbapi';

export const Home = () => {
  useEffect(() => {
    getNowPlayingMovies().then((result) => {
      console.log(result);
    });
  });

  return <div>Home</div>;
};
