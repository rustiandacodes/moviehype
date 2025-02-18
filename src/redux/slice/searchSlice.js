import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { desc: false },
  reducers: {
    changeStatus(state) {
      state.desc = !state.desc;
    },
    escPress(state) {
      state.desc = false;
    },
  },
});

export const { changeStatus, escPress } = searchSlice.actions;
export default searchSlice.reducer;
