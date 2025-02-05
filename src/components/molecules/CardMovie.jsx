import React from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../../utils/genres';
import { StarIcon } from '../atoms/StarIcon';

const CardMovie = (props) => {
  const { title, poster, rating, genre, date } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + poster;
  const year = date.slice(0, 4);

  const findGenre = (id) => {
    const getGenre = genres.find((g) => g.id === id);
    return getGenre.name;
  };

  return (
    <Link className="relative bg-purewhite dark:bg-onyx shadow rounded-lg cursor-pointer hover:scale-105 transition duration-300 overflow-hidden">
      <div className="absolute right-0 theme-switch p-1 top-0 text-xs flex justify-center items-center gap-1 opacity-70">
        <StarIcon />
        <p className="font-medium">{rating.toFixed(1)}</p>
      </div>
      <img src={`${baseImgUrl}`} alt="" />
      <div className="p-2">
        <h3 className="truncate font-semibold ">{title}</h3>
        <div className="flex items-center gap-2 text-xs opacity-75">
          <p>{year}</p>
          <p>|</p>
          <p className="truncate">{findGenre(genre[0])}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;
