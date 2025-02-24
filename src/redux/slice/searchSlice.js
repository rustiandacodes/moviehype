import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { desc: false },
  reducers: {
    changeStatus(state) {
      state.desc = !state.desc;
    },
    changeToFalse(state) {
      state.desc = false;
    },
  },
});

export const { changeStatus, changeToFalse } = searchSlice.actions;
export default searchSlice.reducer;
