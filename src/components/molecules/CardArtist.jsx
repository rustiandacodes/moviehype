import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileIcon } from '../atoms/ProfileIcon';

export const CardArtist = (props) => {
  const { name, image, character } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + image;

  return (
    <Link className="overflow-hidden  cursor-pointer hover:scale-105 transition duration-300">
      {!image ? <ProfileIcon /> : <img className="rounded-t-lg" src={baseImgUrl} alt={name} />}

      <div className="p-2 bg-purewhite dark:bg-onyx rounded-b-lg shadow">
        <p className="font-semibold truncate dark:text-seasalt text-jet">{name}</p>
        <p className="opacity-50 truncate dark:text-seasalt text-jet text-xs md:text-sm">{character}</p>
      </div>
    </Link>
  );
};
