import React from 'react';
import { Link } from 'react-router-dom';

export const CardArtist = (props) => {
  const { name, image } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL + image;

  return (
    <Link className="relative rounded-lg overflow-hidden bg-purewhite dark:bg-onyx shadow cursor-pointer hover:scale-105 transition duration-300">
      <img src={baseImgUrl} alt={name} />
      <div className="p-2">
        <p className="font-semibold truncate">{name}</p>
      </div>
    </Link>
  );
};
