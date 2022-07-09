import { configureStore } from '@reduxjs/toolkit'
import floorsReducer from '../features/floors/floorsSlice';
import buildingButtonSlice from '../features/floors/buildingButtonSlice';
import callbackArraySlice from '../features/floors/callbackArraySlice';
import elevatorActionsSlice from '../features/floors/elevatorActions';

export default configureStore({
  reducer: {
    floors: floorsReducer,
    buildingButton: buildingButtonSlice,
    callbackArray: callbackArraySlice,
    elevatorActions: elevatorActionsSlice
  },
})