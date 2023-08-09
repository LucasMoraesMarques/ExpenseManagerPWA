import { createSlice } from "@reduxjs/toolkit";

export const validationSlice = createSlice({
  name: "validation",
  initialState: { userValidations: {}, validationID: "" },
  reducers: {
    setValidations: (state, action) => {
      state.userValidations = action.payload;
    },
    setValidationID: (state, action) => {
      state.validationID = action.payload;
    },
  },
});

export const { setValidations, setValidationID } = validationSlice.actions;

export default validationSlice.reducer;
