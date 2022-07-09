import { createSlice } from '@reduxjs/toolkit'

export const callbackArraySlice = createSlice({
  name: 'callbackArray',
  initialState: {
    value: [],
  },
  reducers: {
    addCallback: (state, action) => {
      state.value = [...state.value,action.payload];
    },
    resetCallback: (state) => {
        state.value = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCallback, resetCallback } = callbackArraySlice.actions

export default callbackArraySlice.reducer