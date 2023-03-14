import { createSlice } from '@reduxjs/toolkit'

export const validationSlice = createSlice({
  name: 'validation',
  initialState: {userValidations: {}, validationID: ''},
  reducers: {
    setValidations: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userValidations = action.payload
    },
    setValidationID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.validationID = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setValidations, setValidationID } = validationSlice.actions

export default validationSlice.reducer