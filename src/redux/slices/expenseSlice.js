import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: { userExpenses: {}, expenseID: "" },
  reducers: {
    setExpenses: (state, action) => {
      state.userExpenses = action.payload;
    },
    setExpenseID: (state, action) => {
      state.expenseID = action.payload;
    },
  },
});

export const { setExpenses, setExpenseID } = expenseSlice.actions;

export default expenseSlice.reducer;
