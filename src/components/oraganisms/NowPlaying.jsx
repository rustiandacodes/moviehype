import React, { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovie from '../molecules/CardMovie';

export const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoadng] = useState(false);

  useEffect(() => {
    setTimeout(
      getNowPlayingMovies().then((result) => {
        setMovies(result.slice(0, 16));
        setIsLoadng(true);
      }),
      5000
    );
  }, []);

  return (
    <div className="theme-switch container mx-auto py-5 px-5 md:px-0">
      <HeaderSection title="Now Playing" />
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {movies.length > 0 && movies.map((movie, i) => <CardMovie key={i} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} id={movie.id} />)}
      </div>
    </div>
  );
};
