import { PopularOftheWeek } from '../components/oraganisms/PopularOftheWeek';
import { NowPlaying } from '../components/oraganisms/NowPlaying';
import { PopularArtists } from '../components/oraganisms/PopularArtists';
import { TopRated } from '../components/oraganisms/TopRated';
import { UpComing } from '../components/oraganisms/UpComing';
import { useEffect } from 'react';
import { Hero } from '../components/molecules/Hero';
export const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="bg-seasalt dark:bg-jet pt-28 md:pt-20 ">
      <Hero />
      <NowPlaying />
      <UpComing />
      <PopularOftheWeek />
      <TopRated />
      <PopularArtists />
    </div>
  );
};
