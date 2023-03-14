import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {userGroups: {}, groupID: ''},
  reducers: {
    setGroups: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userGroups = action.payload
    },
    setGroupID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.groupID = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGroups, setGroupID } = groupSlice.actions

export default groupSlice.reducer