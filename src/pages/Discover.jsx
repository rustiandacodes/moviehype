import React, { useState, useEffect } from 'react';
import { getDiscoverMovies } from '../services/tmdbapi';
import CardMovie from '../components/molecules/CardMovie';
import { Button } from '../components/atoms/Button';
export const Discover = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDiscoverMovies().then((result) => {
      setMovies(result);
    });
  }, []);

  console.log(movies);

  const showMore = async () => {
    setPage(page + 1);
    const movie = await getDiscoverMovies(page);
    setMovies(movies.concat(movie));
  };

  return (
    <div className="theme-switch py-32 min-h-screen">
      <div className=" container mx-auto py-5 px-5 md:px-0">
        {/* <HeaderSection title="Now Playing" /> */}
        <div className="py-5 grid xl:grid-cols-10 md:grid-cols-5 grid-cols-2 gap-4">
          {movies.length > 0 && movies.map((movie, i) => <CardMovie key={i} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} id={movie.id} />)}
        </div>
        <div
          onClick={() => {
            showMore();
          }}
        >
          <Button desc="Load More" />
        </div>
      </div>
    </div>
  );
};
