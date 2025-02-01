import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addTocart(state, action) {
      state.push(action.payload);
    },
    deletCart(state, action) {
      return state.filter((x) => x.id !== action.payload);
    },
  },
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { status: false },
  reducers: {
    changeTheme(state) {
      return (state = !state.status);
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    theme: themeSlice.reducer,
  },
});

console.log('oncreate store:', store.getState());

store.subscribe(() => {
  console.log('store onchange : ', store.getState());
});

store.dispatch(cartSlice.actions.addTocart({ id: 1, qty: 10 }));
store.dispatch(cartSlice.actions.addTocart({ id: 2, qty: 10 }));
store.dispatch(cartSlice.actions.addTocart({ id: 3, qty: 10 }));
store.dispatch(cartSlice.actions.deletCart(1));
store.dispatch(themeSlice.actions.changeTheme());
