import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
  name: 'config',
  initialState: {reload:false},
  reducers: {
    setReload: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.reload = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReload } = configSlice.actions

export default configSlice.reducer