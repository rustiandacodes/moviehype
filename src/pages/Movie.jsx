import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCredit, getDetail, getSimilarMovie, getVideos } from '../services/tmdbapi';
import { useParams } from 'react-router-dom';
import { addMovie } from '../redux/slice/detailMovieSlice';
import { StarIcon } from '../components/atoms/StarIcon';
import { Button } from '../components/atoms/Button';
import { timeConvert } from '../utils/timeConverter';
import { SimilarMovie } from '../components/oraganisms/SimilarMovie';

export const Movie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [credit, setCredit] = useState([]);
  const [test, setTest] = useState([]);
  const [similar, setSimilar] = useState([]);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const movie = useSelector((state) => state.detailMovie.detail);
  const dispatch = useDispatch();
  const { movie_id } = useParams();

  const merge = Object.assign({ test, credit });
  console.log(merge.test.title);

  useEffect(() => {
    getDetail(movie_id).then((result) => {
      setTest([result]);
      dispatch(addMovie(result));
      localStorage.setItem('detailMovie', JSON.stringify(result));
    });
    getCredit(movie_id).then((result) => {
      setCredit(result);
    });
    getVideos(movie_id).then((result) => {});

    getSimilarMovie(movie_id).then((result) => {
      setSimilar(result);
    });

    const delayLoading = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayLoading);
  }, [movie]);

  return (
    <div className="bg-seasalt dark:bg-jet pt-28 md:pt-20 min-h-screen">
      <div className="flex flex-col gap-3">
        <img src={baseImgUrl + movie.poster_path} alt={movie.title} />
        <div className="px-5 md:px-0 text-jet dark:text-seasalt">
          <h2 className="text-xl font-semibold mb-2 ">
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <div className="flex flex-wrap gap-2 text-sm md:text-base mb-5">
            <div className="flex gap-1 justify-center items-center">
              <StarIcon />
              <p>{movie.vote_average.toFixed(1)}</p>
            </div>
            <p>• {movie.release_date}</p>
            <p>• {timeConvert(movie.runtime)}</p>
            {movie.genres.map((genre, i) => <p key={i}>• {genre.name}</p>) || 'unknown genre'}
          </div>
          <p className=" md:text-base italic mb-2 opacity-85">{movie.tagline}</p>
          <p className="md:text-xl font-semibold mb-1">Overview</p>
          <p className=" md:text-base mb-2">{movie.overview}</p>
        </div>
      </div>
      <div className="px-5 md:px-0 py-3">
        <Button desc="Watch Trailer" />
      </div>
      <SimilarMovie movie={similar} />
    </div>
  );
};
