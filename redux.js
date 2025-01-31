import { legacy_createStore } from 'redux';

const ADD_TO_CART = 'ADD_TO_CART';
const CHANGE_THEME = 'CHANGE_THEME';

const initialState = { cart: [{ id: 1, qty: 20 }], theme: false };

// reducer
const someReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

// store
const store = legacy_createStore(someReducer);
console.log('on create store:', store.getState());

// subscribe
store.subscribe(() => {
  console.log('Store on change : ', store.getState());
});

// dispatch
const action1 = { type: ADD_TO_CART, payload: { id: 2, qty: 10 } };
const action2 = { type: CHANGE_THEME, payload: true };
store.dispatch(action1);
store.dispatch(action2);
