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
import { SkeletonMovieMobile } from '../components/molecules/SkeletonMovieMobile';
import { HeaderSection } from '../components/atoms/HeaderSection';
import Cast from '../components/molecules/Cast';
import { dateConverter } from '../utils/dateConverter';

export const Movie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [credit, setCredit] = useState([]);
  const [director, setDirector] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [similar, setSimilar] = useState([]);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const movie = useSelector((state) => state.detailMovie.detail);
  const dispatch = useDispatch();
  const { movie_id } = useParams();

  useEffect(() => {
    getDetail(movie_id).then((result) => {
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
      const d = result.crew.filter((c) => c.job === 'Director');
      setCredit(result.cast);
      setDirector(d);
    });

    getVideos(movie_id)
      .then((result) => {
        setTrailer(result.videos.results[0].key);
      })
      .catch((error) => {
        setTrailer([]);
        console.log(error);
      });

    getSimilarMovie(movie_id).then((result) => {
      setSimilar(result.slice(0, 16));
    });
  }, [movie_id]);
  console.log(director);

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
              <p>• {dateConverter(movie.release_date)}</p>
              <p>• {timeConvert(movie.runtime)} • </p>
              {movie.genres.map((genre, i) => (
                <p key={i}>
                  {genre.name}
                  {movie.genres.length === i + 1 ? '.' : ','}
                </p>
              )) || 'unknown genre'}
            </div>
            <p className=" md:text-base italic mb-2 opacity-85">{movie.tagline}</p>
            <p className="md:text-xl font-semibold mb-1">Overview</p>
            <p className=" md:text-base mb-2 lg:w-[70%]">{movie.overview}</p>
            <div className="flex gap-5 items-center flex-wrap">
              {director.map((d, i) => (
                <div key={i} className="py-5 flex items-center gap-3">
                  <div className="w-15 h-15 rounded-full overflow-hidden shadow">
                    {!d.profile_path > 0 ? (
                      <div className="flex justify-center items-center bg-purewhite dark:bg-onyx w-full h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <img className="-mt-5" src={baseImgUrl + d.profile_path} alt={d.name} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{d.name}</p>
                    <p className="opacity-70">Director</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-5" onClick={() => setWatchTrailer(true)}>
              <Button desc="Watch Trailer" />
            </div>
          </div>
        </div>
      )}

      <div className={`${watchTrailer ? 'block' : 'hidden'} bg-black flex flex-col gap-3 justify-center my-10 md:px-0 px-5 theme-switch container mx-auto`}>
        <HeaderSection title="Trailer" />
        <iframe className=" w-full aspect-video" src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen></iframe>
      </div>

      <div className="hidden md:block">{isLoading && <SkeletonMovie />}</div>
      <div className="block md:hidden px-5">{isLoading && <SkeletonMovieMobile />}</div>
      <Cast artist={credit} />
      <SimilarMovie movie={similar} />
    </div>
  );
};
