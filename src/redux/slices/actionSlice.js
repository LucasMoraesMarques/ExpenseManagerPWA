import { createSlice } from "@reduxjs/toolkit";

export const actionSlice = createSlice({
  name: "action",
  initialState: { groupsActions: [], userActions: [] },
  reducers: {
    setActions: (state, action) => {
      state.groupsActions = action.payload;
    },
  },
});

export const { setActions } = actionSlice.actions;

export default actionSlice.reducer;
