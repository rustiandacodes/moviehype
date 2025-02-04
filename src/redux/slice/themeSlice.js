import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: JSON.parse(localStorage.getItem('theme')) || { desc: 'light' },
  reducers: {
    changeTheme(state) {
      state.desc === 'light' ? (state.desc = 'dark') : (state.desc = 'light');
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
