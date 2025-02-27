import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileIcon } from '../atoms/ProfileIcon';

export const CardKnownFor = (props) => {
  const { name, title, poster, character, rating = 0, genre = '-', date = '-', id } = props;

  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + poster;

  return (
    <Link to={`/movie/${id}`} className="overflow-hidden  cursor-pointer hover:scale-105 transition duration-300">
      {!poster ? <ProfileIcon /> : <img className="rounded-t-lg h-[80%] w-full" src={baseImgUrl} alt={title} />}

      <div className="p-2 bg-purewhite dark:bg-onyx rounded-b-lg shadow">
        <p className="font-semibold truncate dark:text-seasalt text-jet">{title || name}</p>
        <p className="opacity-50 truncate dark:text-seasalt text-jet text-xs md:text-sm">as {character ? character : name}</p>
      </div>
    </Link>
  );
};
