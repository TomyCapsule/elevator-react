import { createSlice } from '@reduxjs/toolkit'

export const buildingButtonSlice = createSlice({
  name: 'buildingButton',
  initialState: {
    value: null,
  },
  reducers: {
    changeButton: (state, action) => {
      state.value = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { changeButton } = buildingButtonSlice.actions

export default buildingButtonSlice.reducer