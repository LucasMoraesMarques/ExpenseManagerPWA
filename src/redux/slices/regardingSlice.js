import { createSlice } from '@reduxjs/toolkit'

export const regardingSlice = createSlice({
  name: 'regarding',
  initialState: {userRegardings: {}, regardingID: ''},
  reducers: {
    setRegardings: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userRegardings = action.payload
    },
    setRegardingID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.regardingID = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRegardings, setRegardingID } = regardingSlice.actions

export default regardingSlice.reducer