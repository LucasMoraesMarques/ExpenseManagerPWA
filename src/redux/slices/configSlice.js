import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: { reload: false },
  reducers: {
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const { setReload } = configSlice.actions;

export default configSlice.reducer;
