import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const addToCart = createAction('ADD_TO_CART');
const deleteCart = createAction('DELETE_CART');

const cartReducer = createReducer([], (builder) => {
  builder.addCase(addToCart, (state, action) => {
    state.push(action.payload);
  });

  builder.addCase(deleteCart, (state, action) => {
    state.filter((x) => x.id !== action.payload);
    // state.pop();
  });
});

const loginSession = createAction('LOGIN_SESSION');

const loginReducer = createReducer({ status: false }, (builder) => {
  builder.addCase(loginSession, (state, action) => {
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
store.dispatch(addToCart({ id: 3, qty: 20 }));
store.dispatch(deleteCart(2));
