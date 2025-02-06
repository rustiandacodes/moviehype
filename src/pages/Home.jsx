import { PopularOftheWeek } from '../components/oraganisms/PopularOftheWeek';
import { NowPlaying } from '../components/oraganisms/NowPlaying';
import { PopularArtists } from '../components/oraganisms/PopularArtists';
import { TopRated } from '../components/oraganisms/TopRated';
import { UpComing } from '../components/oraganisms/UpComing';
export const Home = () => {
  return (
    <div className="bg-seasalt dark:bg-jet pt-28 ">
      <NowPlaying />
      <UpComing />
      <PopularOftheWeek />
      <TopRated />
      <PopularArtists />
    </div>
  );
};
