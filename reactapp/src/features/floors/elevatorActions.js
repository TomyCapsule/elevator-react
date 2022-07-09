import { createSlice } from '@reduxjs/toolkit'

export const elevatorActionsSlice = createSlice({
  name: 'elevatorActions',
  initialState: {
    value: [],
  },
  reducers: {
    addAction: (state, action) => {
        console.log('action:',action)
        state.value = [...state.value,action.payload];
    },
    initialize: (state,action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addAction, initialize } = elevatorActionsSlice.actions

export default elevatorActionsSlice.reducer