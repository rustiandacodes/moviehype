import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { status: false, desc: 'light mode' },
  reducers: {
    changeTheme(state) {
      state.status = !state.status;
      state.status === true ? (state.desc = 'dark mode') : (state.desc = 'light mode');
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
