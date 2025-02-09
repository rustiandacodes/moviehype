import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlice';
import detailMovieReducer from './slice/detailMovieSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    detailMovie: detailMovieReducer,
  },
});

console.log('oncreate store:', store.getState());
store.subscribe(() => {
  console.log('store onchange : ', store.getState());
});

export default store;
