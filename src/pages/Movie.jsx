import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCredit, getDetail, getSimilarMovie, getVideos } from '../services/tmdbapi';
import { useParams } from 'react-router-dom';
import { addMovie } from '../redux/slice/detailMovieSlice';
import { StarIcon } from '../components/atoms/StarIcon';
import { Button } from '../components/atoms/Button';
import { timeConvert } from '../utils/timeConverter';
import { SimilarMovie } from '../components/oraganisms/SimilarMovie';
import { SkeletonMovie } from '../components/molecules/SkeletonMovie';

export const Movie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [credit, setCredit] = useState([]);
  const [test, setTest] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [similar, setSimilar] = useState([]);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const movie = useSelector((state) => state.detailMovie.detail);
  const dispatch = useDispatch();
  const { movie_id } = useParams();

  useEffect(() => {
    getDetail(movie_id).then((result) => {
      setTest([result]);
      dispatch(addMovie(result));
      localStorage.setItem('detailMovie', JSON.stringify(result));
      window.scrollTo({ top: 0, behavior: 'instant' });
      setWatchTrailer(false);
      const delayLoading = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(delayLoading);
    });

    getCredit(movie_id).then((result) => {
      setCredit(result);
    });

    getVideos(movie_id).then((result) => {
      setTrailer(result.videos.results[0].key);
    });

    getSimilarMovie(movie_id).then((result) => {
      setSimilar(result.slice(0, 16));
    });
  }, [movie_id]);

  return (
    <div className="bg-seasalt dark:bg-jet pt-28 md:pt-20 min-h-screen">
      {!isLoading && (
        <div className="flex flex-col md:flex-row items-center md:gap-10 gap-3 md:container mx-auto md:py-8">
          <img className="md:w-[300px] md:rounded-2xl" src={baseImgUrl + movie.poster_path} alt={movie.title} />
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
            <p className=" md:text-base mb-2 lg:w-[70%]">{movie.overview}</p>
            <div className="py-5" onClick={() => setWatchTrailer(true)}>
              <Button desc="Watch Trailer" />
            </div>
          </div>
        </div>
      )}
      {isLoading && <SkeletonMovie />}

      <div className={`${watchTrailer ? 'block' : 'hidden'} bg-black flex justify-center my-10 md:px-0 px-5 theme-switch`}>
        <iframe className="md:w-[100%] lg:w-[80%] w-full aspect-video" src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen></iframe>
      </div>
      <SimilarMovie movie={similar} />
    </div>
  );
};
