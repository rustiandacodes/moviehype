import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { status: false, desc: 'light' },
  reducers: {
    changeTheme(state) {
      state.status = !state.status;
      state.status === true ? (state.desc = 'dark') : (state.desc = 'light');
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
