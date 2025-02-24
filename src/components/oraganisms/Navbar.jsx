import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon } from '../atoms/SunIcon';
import { MoonIcon } from '../atoms/MoonIcon';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/slice/themeSlice';
import { changeStatus } from '../../redux/slice/searchSlice';

export const Navbar = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <div>
      <div className="bg-purewhite dark:bg-onyx text-jet dark:text-seasalt px-5 md:px-0 fixed z-30 w-full shadow">
        <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between items-center py-5">
          <div>
            <Link to={'/'} className="text-jet dark:text-seasalt font-bold text-2xl">
              MOVIE <span className="text-red-500">HYPE</span>
            </Link>
          </div>
          <div>
            <ul className="flex justify-center items-center gap-5 text-sm md:text-base">
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/discover'}>Discover</Link>
              </li>
              <li className="flex justify-center items-center cursor-pointer py-1 px-2 rounded-3xl bg-seasalt dark:bg-jet text-xs" onClick={() => dispatch(changeStatus())}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <p className="hidden md:block">CTRL+K</p>
              </li>
              <li className="cursor-pointer" onClick={() => dispatch(changeTheme())}>
                {theme.desc === 'light' ? <MoonIcon /> : <SunIcon />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
