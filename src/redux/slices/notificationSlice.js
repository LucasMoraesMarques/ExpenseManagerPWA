import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: { userNotifications: {}, notificationID: "" },
  reducers: {
    setNotifications: (state, action) => {
      state.userNotifications = action.payload;
    },
    setNotificationID: (state, action) => {
      state.notificationID = action.payload;
    },
  },
});

export const { setNotifications, setNotificationID } =
  notificationSlice.actions;

export default notificationSlice.reducer;
