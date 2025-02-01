import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const addToCart = createAction('ADD_TO_CART');
const deleteCart = createAction('DELETE_CART');

const cartReducer = createReducer([], (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      state.push(action.payload);
    })
    .addCase(deleteCart, (state, action) => {
      return state.filter((x) => x.id !== action.payload);
    });
});

const loginSession = createAction('LOGIN_SESSION');

const loginReducer = createReducer({ status: false }, (builder) => {
  builder.addCase(loginSession, (state) => {
    state.status = true;
  });
});

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
  },
});

console.log('oncreate store:', store.getState());
store.subscribe(() => {
  console.log('store onchange : ', store.getState());
});

store.dispatch(addToCart({ id: 2, qty: 10 }));
store.dispatch(addToCart({ id: 4, qty: 10 }));
store.dispatch(addToCart({ id: 6, qty: 10 }));
store.dispatch(addToCart({ id: 3, qty: 20 }));
store.dispatch(deleteCart(2));
