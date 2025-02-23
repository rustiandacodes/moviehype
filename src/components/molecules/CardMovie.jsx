import React from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../../utils/genres';
import { StarIcon } from '../atoms/StarIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardMovie = (props) => {
  const { title = '-', poster, rating = 0, genre = '-', date = '-', id = '-' } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + poster;
  const year = date.slice(0, 4);

  const findGenre = (id) => {
    const getGenre = genres.find((g) => g.id === id);
    if (getGenre) {
      return getGenre.name;
    }
    return '-';
  };

  return (
    <Link to={`/movie/${id}`} className="relative bg-purewhite dark:bg-onyx shadow rounded-lg cursor-pointer hover:scale-105 transition duration-300 overflow-hidden">
      <div className="absolute right-0 theme-switch p-1 top-0 text-xs flex justify-center items-center gap-1 opacity-70">
        <StarIcon />
        <p className="font-medium">{rating.toFixed(1)}</p>
      </div>
      {poster ? (
        <img className="h-[80%] w-full" src={`${baseImgUrl}`} alt={title} />
      ) : (
        <div className="flex justify-center items-center h-[80%] bg-seasalt dark:bg-jet/50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="p-2">
        <h3 className="truncate font-semibold ">{title || <Skeleton />}</h3>
        <div className="flex items-center gap-2 text-xs opacity-75">
          <p>{year}</p>
          <p>|</p>
          <p className="truncate">{findGenre(genre[0]) || ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;
