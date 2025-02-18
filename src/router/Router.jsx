import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Discover } from '../pages/Discover';
import { Results } from '../pages/Results';
import { Movie } from '../pages/Movie';
import { Artist } from '../pages/Artist';
import { NotFound } from '../pages/404NotFound';
import { Navbar } from '../components/oraganisms/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../components/molecules/Search';
import { useState, useEffect } from 'react';
import { changeStatus, escPress } from '../redux/slice/searchSlice';

export const Router = () => {
  const theme = useSelector((state) => state.theme.desc);
  const [keysPressed, setKeysPressed] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key.toLowerCase()]: true }));

      if (keysPressed['control'] && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        dispatch(changeStatus());
      }
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prev) => {
        const updatedKeys = { ...prev };
        delete updatedKeys[event.key.toLowerCase()];
        return updatedKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed]);

  return (
    <div className={theme}>
      <Search />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/results/:movie_key" element={<Results />} />
        <Route path="/movie/:movie_id" element={<Movie />} />
        <Route path="/artist/:artist_id" element={<Artist />} />
      </Routes>
    </div>
  );
};
