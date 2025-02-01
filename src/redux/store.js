import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlice';

const store = configureStore({
  reducer: { theme: themeReducer },
});

console.log('oncreate store:', store.getState());
store.subscribe(() => {
  console.log('store onchange : ', store.getState());
});

export default store;
