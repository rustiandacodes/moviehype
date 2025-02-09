import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Movie = () => {
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const movie = useSelector((state) => state.detailMovie.detail);
  const { genres, title, overview, poster_path, vote_average } = movie;
  console.log(movie);

  return (
    <div className="bg-seasalt dark:bg-jet pt-28 md:pt-20 ">
      <div className="flex flex-col gap-3">
        <img src={baseImgUrl + poster_path} alt={title} />
        <div className="px-5 md:px-0 text-jet dark:text-seasalt">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <p>{vote_average.toFixed(1)}</p>
            {genres.map((genre) => (
              <p>| {genre.name}</p>
            ))}
          </div>
          <p className="text-sm md:text-base">{overview}</p>
        </div>
      </div>
    </div>
  );
};
