import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Components/signups/SignUp";
import SignUpInfo from "./Components/Components/signups/SignUpInfo";
import SignIn from "./Components/Components/signups/SignIn";
import Appointments from "./Components/Components/dashboard/Appointments";
import ProtectedRoutes from "./protectedRoutes";
import Dashboard from "./Components/Components/Dashboard";
import CreateAppointments from "./Components/Components/dashboard/CreateAppointments";
import Users from "./Components/Components/dashboard/Users";
import Doctors from "./Components/Components/dashboard/Doctors";
import Patients from "./Components/Components/dashboard/Patients";
import Profile from "./Components/Components/dashboard/Profile";
import ReadUpdateAppointment from "./Components/Components/dashboard/ReadUpdateAppointment";
import SignUpInfoDoctor from "./Components/Components/signups/SignUpInfoDoctor";
import SignUpDoctor from "./Components/Components/signups/SignUpDoctor";
import AppointmentsHistory from "./Components/Components/dashboard/AppointmentsHistory";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="signUp" element={<SignUp />}/>
          <Route path="SignUpInfo" element={<SignUpInfo />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="signUpDoctor" element={<SignUpDoctor />}/>
            <Route path="SignUpInfoDoctor" element={<SignUpInfoDoctor />} />
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="dashboard/appointments" element={<Appointments />} />
            <Route path="/dashboard/appointment/history" element={<AppointmentsHistory />} />
            <Route path="dashboard/createAppointemnt" element={<CreateAppointments />} />
            <Route path="/dashboard/admin/users" element={<Users />} />
            <Route path="/dashboard/admin/doctors" element={<Doctors />} />
            <Route path="/dashboard/admin/patients" element={<Patients />} />
            <Route path="profile" element={<Profile />} />
            <Route path="readAppointment/:appointmentId" element={<ReadUpdateAppointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
