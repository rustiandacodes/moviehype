import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/slice/themeSlice';
export const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.desc);
  return (
    <div>
      <div className="h-screen w-screen bg-purewhite dark:bg-jet">
        <div className="p-3" onClick={() => dispatch(changeTheme())}>
          {theme}
        </div>
      </div>
    </div>
  );
};
