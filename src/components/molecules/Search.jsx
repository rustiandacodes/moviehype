import React, { useEffect, useRef, useState } from 'react';
import { searchMovie } from '../../services/tmdbapi';
import { dateConverter } from '../../utils/dateConverter';
import { findGenre } from '../../utils/findGenreById';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, changeToFalse } from '../../redux/slice/searchSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Search = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [totalPages, setTotalPages] = useState({});
  const [keysPressed, setKeysPressed] = useState({});
  const [selectedItem, setSelectedItem] = useState(-1);
  const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;
  const show = useSelector((state) => state.search.desc);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      try {
        const response = await searchMovie(keywords);
        setMovies(response.results);
        setTotalPages(response);
      } catch (error) {
        console.log('An error occurred while retrieving data:', error.message);
      }
    };

    search();

    inputRef.current?.focus();

    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

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

      if (event.key === 'Enter' && selectedItem === -1) {
        navigate(`/results/${keywords}`);
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

    const handleScroll = (e) => {
      if (scrollRef.current && selectedItem > 1) {
        const scrollAmount = 130;
        switch (e.key) {
          case 'ArrowUp':
            scrollRef.current.scrollBy({ top: -scrollAmount, behavior: 'instant' });
            break;
          case 'ArrowDown':
            scrollRef.current.scrollBy({ top: scrollAmount, behavior: 'instant' });
            break;

          default:
            break;
        }
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(changeToFalse());
        setKeywords('');
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [keywords, keysPressed, show]);

  const handleKeySearch = (e) => {
    console.log(e.key);
    if (e.key === 'ArrowUp' && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (e.key === 'ArrowDown' && selectedItem < movies.length - 1) {
      setSelectedItem((prev) => prev + 1);
    } else if (e.key === 'Enter' && selectedItem < movies.length - 1) {
      dispatch(changeToFalse());
      navigate(`/movie/${movies[selectedItem].id}`);
    }
  };

  return (
    <div className={`${show ? 'block' : 'hidden'} absolute top-0 left-0 right-0 bottom-0`}>
      <div className="fixed w-screen h-screen z-50 bg-seasalt dark:bg-jet opacity-[98%] "></div>
      <div ref={modalRef} className="relative flex justify-center top-20">
        <div className={`lg:w-[35%] w-[90%]  z-50 bg-purewhite dark:bg-onyx rounded-lg`}>
          <div className="w-full bg-purewhite dark:bg-onyx flex gap-5 justify-between items-center border-b-1 dark:border-seasalt/10 border-onyx/10 p-5 rounded-t-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 dark:fill-seasalt fill-jet">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <input
              onKeyDown={handleKeySearch}
              ref={inputRef}
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
                setSelectedItem(-1);
              }}
              className="w-full outline-none dark:text-seasalt text-jet"
              placeholder="Search any movies..."
              type="text"
            />
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
          <div ref={scrollRef} className={`${movies.length > 0 ? 'md:max-h-[600px] max-h-[550px] ' : ''} overflow-scroll `}>
            {!movies.length > 0 && (
              <div className="py-20">
                <p className="text-center dark:text-seasalt text-onyx">{!keywords ? 'No recent searches' : `No results for : ${keywords}`}</p>
              </div>
            )}
            {movies.length > 0 && (
              <div>
                {movies.length > 0 &&
                  movies.map((movie, i) => (
                    <Link
                      onClick={() => {
                        dispatch(changeStatus());
                        setKeywords('');
                      }}
                      to={`/movie/${movie.id}`}
                      key={i}
                      className={`${selectedItem === i ? 'bg-red-500/50' : ''} flex gap-2 border-b-1 dark:border-seasalt/10 border-onyx/10 p-3 text-jet dark:text-seasalt hover:bg-red-500/50 hover:text-seasalt`}
                    >
                      {!movie.poster_path && (
                        <div className="flex justify-center items-center w-20 h-24 bg-seasalt dark:bg-jet rounded-lg ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 fill-onyx dark:fill-seasalt">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                        </div>
                      )}
                      {movie.poster_path && <img className="w-20 rounded-lg" src={baseImgUrl + movie.poster_path} alt={movie.title} />}

                      <div>
                        <p className="text-base font-semibold">{movie.title || '-'}</p>
                        <p className="text-sm mb-1">{dateConverter(movie.release_date) || '-'}</p>
                        <div className="flex gap-1 flex-wrap">
                          {movie.genre_ids.map((id) => (
                            <span key={id} className="p-1 border dark:text-seasalt/50 text-onyx dark:border-seasalt/10 border-onyx/30 rounded text-xs">
                              {(id > 0 && findGenre(id)) || '-'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                <Link
                  to={`/results/${keywords}`}
                  onClick={() => {
                    dispatch(changeToFalse());
                    setKeywords('');
                  }}
                  className={`${totalPages.total_pages > 1 ? 'block' : 'hidden'} flex justify-center p-5`}
                >
                  <div className="bg-red-500 w-full text-center rounded-lg cursor-pointer">
                    <p className="text-seasalt p-3">View More</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="p-3 text-xs flex gap-3 items-center border-t dark:border-seasalt/10 border-onyx/30">
            <p className="dark:text-seasalt/50 text-onyx">Results : {totalPages.total_results}</p>
            <p className="dark:text-seasalt/50 text-onyx">Total Pages : {totalPages.total_pages - 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
