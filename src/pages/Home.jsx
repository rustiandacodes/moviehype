import { PopularOftheWeek } from '../components/oraganisms/PopularOftheWeek';
import { NowPlaying } from '../components/oraganisms/NowPlaying';
import { PopularArtists } from '../components/oraganisms/PopularArtists';
export const Home = () => {
  return (
    <div className="bg-seasalt dark:bg-jet pt-28 ">
      <NowPlaying />
      <PopularOftheWeek />
      <PopularArtists />
    </div>
  );
};
