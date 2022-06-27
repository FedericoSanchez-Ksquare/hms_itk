import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../Components/slices/authSlice';
import appointmentReducer from '../Components/slices/appointmentsSlice';
import userReducer from '../Components/slices/userSlice'
import patientReducer from '../Components/slices/patientSlice'
import doctorReducer from '../Components/slices/doctorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    user: userReducer,
    patient: patientReducer,
    doctor: doctorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
