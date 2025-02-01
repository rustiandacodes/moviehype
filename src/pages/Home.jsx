import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/slice/themeSlice';
export const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.desc);
  return (
    <div className="bg-dodgerblue">
      <div>{theme}</div>
      <button className="cursor-pointer p-3 bg-amber-100" onClick={() => dispatch(changeTheme())}>
        theme change
      </button>
    </div>
  );
};
