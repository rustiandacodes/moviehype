import React from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../../utils/genres';
import { StarIcon } from '../atoms/StarIcon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardMovie = (props) => {
  const { title, poster, rating, genre, date, movie_id } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + poster;
  const year = date.slice(0, 4);

  const findGenre = (id) => {
    const getGenre = genres.find((g) => g.id === id);
    if (getGenre) {
      return getGenre.name;
    }
    return 'Unknown Genre';
  };

  return (
    <Link className="relative bg-purewhite dark:bg-onyx shadow rounded-lg cursor-pointer hover:scale-105 transition duration-300 overflow-hidden">
      <div className="absolute right-0 theme-switch p-1 top-0 text-xs flex justify-center items-center gap-1 opacity-70">
        <StarIcon />
        <p className="font-medium">{rating.toFixed(1)}</p>
      </div>
      <img src={`${baseImgUrl}`} alt={title} />
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
