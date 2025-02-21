import React, { useState, useEffect } from 'react';
import { searchMovie } from '../services/tmdbapi';
import CardMovie from '../components/molecules/CardMovie';
import { Button } from '../components/atoms/Button';
import CardMovieSkeleton from '../components/molecules/CardMovieSkeleton';
import { ButtonSkeleton } from '../components/atoms/ButtonSkeleton';
import { useParams } from 'react-router-dom';

export const Results = () => {
  const [page, setPage] = useState(2);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(true);
  const { movie_key } = useParams();

  console.log(totalPages);

  useEffect(() => {
    searchMovie(movie_key).then((res) => {
      setMovies(res.results);
      setTotalPages(res.total_pages);
    });
    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, [movie_key]);

  const showMore = async () => {
    setPage(page + 1);
    try {
      const response = await searchMovie(movie_key, page);
      setMovies(movies.concat(response.results));
      console.log(response);
    } catch (error) {
      console.log('Terjadi kesalahan saat mengambil data:', error.message);
    }
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
          <div className={`${page === totalPages ? 'hidden' : 'block'} flex justify-center`}>{isLoading ? <ButtonSkeleton /> : <Button desc="Load More" />}</div>
        </div>
      </div>
    </div>
  );
};
