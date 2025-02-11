import React, { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovie from '../molecules/CardMovie';
import Skeleton from 'react-loading-skeleton';
import CardMovieSkeleton from '../molecules/CardMovieSkeleton';

export const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNowPlayingMovies().then((result) => {
      setMovies(result.slice(0, 16));
      
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
    });

  }, []);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      {!isLoading ? <HeaderSection title="Now Playing" /> : <Skeleton width={300} height={20} />}

      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {isLoading && <CardMovieSkeleton length={16} />}
        {!isLoading && movies.length > 0 && movies.map((movie, i) => <CardMovie key={i} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} id={movie.id} />)}
      </div>
    </div>
  );
};
