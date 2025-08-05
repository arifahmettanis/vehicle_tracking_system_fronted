import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./UserSlice"
import TripSlice from './TripSlice'
import VehicleSlice from './VehicleSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    trip: TripSlice,
    vehicle: VehicleSlice
  },
})