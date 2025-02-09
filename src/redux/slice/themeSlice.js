import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { desc: 'light' },
  reducers: {
    changeTheme(state) {
      state.desc === 'light' ? (state.desc = 'dark') : (state.desc = 'light');
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
