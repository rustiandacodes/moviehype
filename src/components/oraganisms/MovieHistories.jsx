import React from 'react';
import { HeaderSection } from '../atoms/HeaderSection';

const MovieHistories = (props) => {
  const { movies } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;

  console.log(movies);

  return (
    <div className="py-10 md:px-0 px-5">
      <HeaderSection title="Known For" />
      <div className="mt-5">
        {movies.length > 0 &&
          movies.map((movie, i) => (
            <div className={`dark:bg-onyx bg-purewhite p-2 mb-3 flex items-center gap-5 rounded-lg `} key={i}>
              <div>
                <img className="w-[70px] rounded-lg" src={baseImgUrl + movie.poster_path} alt={movie.title} />
              </div>
              <div>
                <h2 className="font-semibold">{movie.title ? movie.title : movie.name}</h2>
                <p className="test-sm">as {movie.character}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieHistories;
