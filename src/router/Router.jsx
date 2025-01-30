import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Discover } from '../pages/Discover';
import { Results } from '../pages/Results';
import { Movie } from '../pages/Movie';
import { Artist } from '../pages/Artist';
export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/results/:movie_key" element={<Results />} />
        <Route path="/movie/:movie_id" element={<Movie />} />
        <Route path="/artist/:artist_id" element={<Artist />} />
      </Routes>
    </>
  );
};
