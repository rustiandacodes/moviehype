import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { desc: false },
  reducers: {
    changeStatus(state) {
      state.desc = !state.desc;
    },
  },
});

export const { changeStatus } = searchSlice.actions;
export default searchSlice.reducer;
