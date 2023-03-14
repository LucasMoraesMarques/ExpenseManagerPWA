import { createSlice } from '@reduxjs/toolkit'

export const expenseSlice = createSlice({
  name: 'expense',
  initialState: {userExpenses: {}, expenseID: ''},
  reducers: {
    setExpenses: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userExpenses = action.payload
    },
    setExpenseID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.expenseID = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExpenses, setExpenseID } = expenseSlice.actions

export default expenseSlice.reducer