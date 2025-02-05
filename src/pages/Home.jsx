import { useDispatch } from 'react-redux';
import { PopularOftheWeek } from '../components/oraganisms/PopularOftheWeek';
import { NowPlaying } from '../components/oraganisms/NowPlaying';
export const Home = () => {
  return (
    <div className="bg-seasalt dark:bg-jet pt-28">
      {/* <div className="h-screen w-screen flex justify-center items-center bg-seasalt dark:bg-jet">
        <div className="w-1/4 bg-purewhite dark:bg-onyx p-5 rounded-2xl">
          <p className="dark:text-seasalt mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus illo inventore rem consectetur exercitationem placeat, obcaecati facere excepturi reprehenderit minus temporibus, corrupti culpa soluta modi! Quasi enim
            maiores suscipit veniam eos, architecto ad provident laboriosam aperiam, doloribus adipisci quas.
          </p>
          <div className="p-3 rounded text-purewhite dark:text-seasalt bg-argentinianblue dark:bg-dodgerblue cursor-pointer" onClick={() => dispatch(changeTheme())}>
            <p className="text-center font-semibold">Change Theme</p>
          </div>
        </div>
      </div> */}
      <NowPlaying />
      <PopularOftheWeek />
    </div>
  );
};
