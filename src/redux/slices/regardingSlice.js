import { createSlice } from "@reduxjs/toolkit";

export const regardingSlice = createSlice({
  name: "regarding",
  initialState: { userRegardings: {}, regardingID: "" },
  reducers: {
    setRegardings: (state, action) => {
      state.userRegardings = action.payload;
    },
    setRegardingID: (state, action) => {
      state.regardingID = action.payload;
    },
  },
});

export const { setRegardings, setRegardingID } = regardingSlice.actions;

export default regardingSlice.reducer;
