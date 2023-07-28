import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import groupReducer from "./slices/groupSlice";
import regardingReducer from "./slices/regardingSlice";
import expenseReducer from "./slices/expenseSlice";
import notificationReducer from "./slices/notificationSlice";
import validationReducer from "./slices/validationSlice";
import actionReducer from "./slices/actionSlice";
import messageReducer from "./slices/messageSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  regarding: regardingReducer,
  expense: expenseReducer,
  notification: notificationReducer,
  validation: validationReducer,
  action: actionReducer,
  message: messageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_DEBUG,
  middleware: [thunk]
})

export const persistor = persistStore(store)
