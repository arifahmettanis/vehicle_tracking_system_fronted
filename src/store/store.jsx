import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./UserSlice"
import TripSlice from './TripSlice'
import VehicleSlice from './VehicleSlice'
import IncidentSlice  from './IncidentSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    trip: TripSlice,
    vehicle: VehicleSlice,
    incident:IncidentSlice
  },
})