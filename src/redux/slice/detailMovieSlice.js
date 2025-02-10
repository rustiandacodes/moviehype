import { createSlice } from '@reduxjs/toolkit';

const detailMovieSlice = createSlice({
  name: 'detailMovie',
  initialState: { detail: JSON.parse(localStorage.getItem('detailMovie')) } || { detail: [] },
  reducers: {
    addMovie(state, action) {
      state.detail = action.payload;
    },
  },
});

export const { addMovie } = detailMovieSlice.actions;
export default detailMovieSlice.reducer;
