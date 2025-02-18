import React, { useState, useEffect } from 'react';
import { getDiscoverMovies } from '../services/tmdbapi';
import CardMovie from '../components/molecules/CardMovie';
import { Button } from '../components/atoms/Button';
import CardMovieSkeleton from '../components/molecules/CardMovieSkeleton';
import { ButtonSkeleton } from '../components/atoms/ButtonSkeleton';

export const Discover = () => {
  const [page, setPage] = useState(2);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDiscoverMovies().then((result) => {
      setMovies(result);
    });
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, []);

  const showMore = async () => {
    setPage(page + 1);
    const movie = await getDiscoverMovies(page);
    setMovies(movies.concat(movie));
  };

  return (
    <div className="theme-switch pt-24 min-h-screen">
      <div className=" container mx-auto py-5 px-5 md:px-0">
        <div className="py-5 grid xl:grid-cols-10 md:grid-cols-5 grid-cols-2 gap-4">
          {isLoading && <CardMovieSkeleton length={20} />}
          {!isLoading && movies.length > 0 && movies.map((movie, i) => <CardMovie key={i} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} genre={movie.genre_ids} date={movie.release_date} id={movie.id} />)}
        </div>
        <div
          onClick={() => {
            showMore();
          }}
        >
          <div className="flex justify-center">{isLoading ? <ButtonSkeleton /> : <Button desc="Load More" />}</div>
        </div>
      </div>
    </div>
  );
};
