import React from 'react';
import { HeaderSection } from '../atoms/HeaderSection';
import { dateConverter, yearConverter } from '../../utils/dateConverter';

const MovieHistories = (props) => {
  const { movies } = props;
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;

  return (
    <div className="md:py-10 py-3 md:px-0 px-5">
      {/* <HeaderSection title="Acting" /> */}
      <h3 className="font-bold text-lg">Acting</h3>
      <div className="mt-4">
        {movies.length > 0 &&
          movies.map((movie, i) => (
            <div className={`dark:bg-onyx bg-purewhite p-2 mb-3 flex items-center gap-5 rounded-lg `} key={i}>
              <div>
                <img className="w-[70px] rounded-lg" src={baseImgUrl + movie.poster_path} alt={movie.title} />
              </div>
              <div>
                <h2 className="font-semibold">
                  {movie.title ? movie.title : movie.name}
                  <span className=" capitalize">{` (${movie.media_type})`}</span>
                </h2>
                <p>{movie.release_date ? dateConverter(movie.release_date) : ''}</p>

                <p className="test-sm dark:text-seasalt/50 text-onyx/50">{movie.character.length > 0 ? 'as ' + movie.character : ''}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieHistories;
