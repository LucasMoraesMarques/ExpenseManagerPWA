import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import groupReducer from "./slices/groupSlice";
import regardingReducer from "./slices/regardingSlice";
import expenseReducer from "./slices/expenseSlice";
import notificationReducer from "./slices/notificationSlice";
import validationReducer from "./slices/validationSlice";
import actionReducer from "./slices/actionSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    regarding: regardingReducer,
    expense: expenseReducer,
    notification: notificationReducer,
    validation: validationReducer,
    action: actionReducer
  },
  devTools: true
})
