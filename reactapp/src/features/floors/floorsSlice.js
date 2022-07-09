import { createSlice } from '@reduxjs/toolkit'

export const floorsSlice = createSlice({
  name: 'floors',
  initialState: {
    value: 3,
  },
  reducers: {
    changeFloor: (state, action) => {
      state.value = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { changeFloor } = floorsSlice.actions

export default floorsSlice.reducer