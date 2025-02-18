import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlice';
import detailMovieReducer from './slice/detailMovieSlice';
import searchReducer from './slice/searchSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    detailMovie: detailMovieReducer,
    search: searchReducer,
  },
});

console.log('oncreate store:', store.getState());
store.subscribe(() => {
  console.log('store onchange : ', store.getState());
});

export default store;
