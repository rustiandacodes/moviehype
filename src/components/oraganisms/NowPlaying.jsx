import React, { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovie from '../molecules/CardMovie';

export const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getNowPlayingMovies().then((result) => {
      //   const recentRelease = result.filter((movie) => movie.release_date.slice(0, 4) === '2025');
      setMovies(result.slice(0, 16));
    });
  }, []);

  console.log(movies);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      <HeaderSection title="Now Playing" />
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {movies.length > 0 && movies.map((movie) => <CardMovie key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} />)}
      </div>
    </div>
  );
};
