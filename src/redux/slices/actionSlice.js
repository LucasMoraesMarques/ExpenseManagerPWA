import { createSlice } from '@reduxjs/toolkit'

export const actionSlice = createSlice({
  name: 'action',
  initialState: {groupsActions: [], userActions: []},
  reducers: {
    setActions: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.groupsActions = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActions } = actionSlice.actions

export default actionSlice.reducer