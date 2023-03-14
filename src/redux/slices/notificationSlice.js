import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {userNotifications: {}, notificationID: ''},
  reducers: {
    setNotifications: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userNotifications = action.payload
    },
    setNotificationID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.notificationID = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNotifications, setNotificationID } = notificationSlice.actions

export default notificationSlice.reducer