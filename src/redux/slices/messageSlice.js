import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {messages: []},
  reducers: {
    setMessages: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      console.log('here2', action)
      state.messages = [...state.messages, action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMessages, addMessage } = messageSlice.actions

export default messageSlice.reducer