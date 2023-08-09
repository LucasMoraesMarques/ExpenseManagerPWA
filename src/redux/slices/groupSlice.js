import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "group",
  initialState: { userGroups: [], groupID: "" },
  reducers: {
    setGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    setGroupID: (state, action) => {
      state.groupID = action.payload;
    },
  },
});

export const { setGroups, setGroupID } = groupSlice.actions;

export default groupSlice.reducer;
