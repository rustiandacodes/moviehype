import React, { useEffect, useRef, useState } from 'react';
import { searchMovie } from '../../services/tmdbapi';
import { dateConverter } from '../../utils/dateConverter';
import { findGenre } from '../../utils/findGenreById';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, changeToFalse } from '../../redux/slice/searchSlice';
import { Link } from 'react-router-dom';

export const Search = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState('');
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const [keysPressed, setKeysPressed] = useState({});
  const show = useSelector((state) => state.search.desc);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await searchMovie(keywords);
        setMovies(response.results);
      } catch (error) {
        console.log('Terjadi kesalahan saat mengambil data:', error.message);
      }
    };

    search();

    const handleKeyDown = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key.toLowerCase()]: true }));

      if (keysPressed['control'] && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        dispatch(changeStatus());
        setKeywords('');
      }
      if (event.key === 'Escape') {
        dispatch(changeToFalse());
        setKeywords('');
      }
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prev) => {
        const updatedKeys = { ...prev };
        delete updatedKeys[event.key.toLowerCase()];
        return updatedKeys;
      });
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(changeToFalse());
        setKeywords('');
        console.log('click di luar');
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [keywords, keysPressed]);

  return (
    <div className={`${show ? 'block' : 'hidden'} absolute top-0 left-0 right-0 bottom-0`}>
      <div className="fixed w-screen h-screen z-50 bg-seasalt dark:bg-jet opacity-95 "></div>
      <div ref={modalRef} className="flex justify-center">
        <div className={`fixed lg:w-[35%] w-[90%] ${movies.length > 0 ? 'h-[90%] md:h-[80%]' : ''}  z-50 bg-purewhite dark:bg-onyx md:top-20 top-10 rounded-lg`}>
          <div className="fixed lg:w-[35%] w-[90%] bg-purewhite dark:bg-onyx flex gap-5 justify-between items-center border-b-1 dark:border-seasalt/10 border-onyx/10 p-5 rounded-t-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 dark:fill-seasalt fill-jet">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <input autoFocus value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full outline-none dark:text-seasalt text-jet" placeholder="Discover many movies..." type="text" />
            <div
              className="text-jet dark:text-seasalt"
              onClick={() => {
                dispatch(changeStatus());
                setKeywords('');
              }}
            >
              <span className="p-[3px] dark:border-seasalt/20 border-onyx/50 border rounded cursor-pointer text-xs">esc</span>
            </div>
          </div>
          {!movies.length > 0 && (
            <div className="pt-24 pb-8">
              <p className="text-center dark:text-seasalt text-onyx">{!keywords ? 'No recent searches' : `No results for : ${keywords}`}</p>
            </div>
          )}
          {movies.length > 0 && (
            <div className="pt-16 h-[100%] overflow-scroll">
              {movies.length > 0 &&
                movies.map((movie, i) => (
                  <Link
                    onClick={() => {
                      dispatch(changeStatus());
                      setKeywords('');
                    }}
                    to={`/movie/${movie.id}`}
                    key={i}
                    className="flex gap-2 border-b-1 dark:border-seasalt/10 border-onyx/10 p-3 text-jet dark:text-seasalt"
                  >
                    <img className="w-20 rounded-lg" src={baseImgUrl + movie.poster_path} alt={movie.title} />
                    <div>
                      <p className="text-lg font-semibold">{movie.title}</p>
                      <p className="text-sm mb-1">{dateConverter(movie.release_date)}</p>
                      <div className="flex gap-1 flex-wrap ">
                        {movie.genre_ids.map((id) => (
                          <span key={id} className="p-1 border dark:text-seasalt/50 text-onyx dark:border-seasalt/10 border-onyx/30 rounded text-xs">
                            {id > 0 && findGenre(id)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
