import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Discover } from '../pages/Discover';
import { Results } from '../pages/Results';
import { Movie } from '../pages/Movie';
import { Artist } from '../pages/Artist';
import { NotFound } from '../pages/404NotFound';
export const Router = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/results/:movie_key" element={<Results />} />
        <Route path="/movie/:movie_id" element={<Movie />} />
        <Route path="/artist/:artist_id" element={<Artist />} />
      </Routes>
    </>
  );
};
