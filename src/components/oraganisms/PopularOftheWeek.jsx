import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/tmdbapi';
import { HeaderSection } from '../atoms/HeaderSection';
import CardMovie from '../molecules/CardMovie';

export const PopularOftheWeek = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getPopularMovies().then((results) => {
      setMovies(results);
    });
  }, []);

  return (
    <div className="theme-switch container mx-auto">
      <HeaderSection title="Popular of The Week" />
      <div className="py-5 grid xl:grid-cols-8 md:grid-cols-5 grid-cols-2 gap-4">
        {movies.length > 0 && movies.map((movie) => <CardMovie key={movie.id} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} />)}
      </div>
    </div>
  );
};
