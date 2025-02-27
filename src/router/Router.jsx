import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Discover } from '../pages/Discover';
import { Results } from '../pages/Results';
import { Movie } from '../pages/Movie';
import { NotFound } from '../pages/404NotFound';
import { Navbar } from '../components/oraganisms/Navbar';
import { useSelector } from 'react-redux';
import { Search } from '../components/molecules/Search';
import { Person } from '../pages/Person';

export const Router = () => {
  const theme = useSelector((state) => state.theme.desc);

  return (
    <div className={theme}>
      <Search />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/results/:movie_key" element={<Results />} />
        <Route path="/results" element={<Results />} />
        <Route path="/movie/:movie_id" element={<Movie />} />
        <Route path="/person/:person_id" element={<Person />} />
      </Routes>
    </div>
  );
};
