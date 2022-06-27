import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UseAuth } from "../../protectedRoutes";
import { authStatus } from "../slices/authSlice";
import { doctorSelection, readDoctor } from "../slices/doctorSlice";
import { readPatient, showOnePatient } from "../slices/patientSlice";
import { fetchUser, lookUpRole, userRole } from "../slices/userSlice";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const RoleAuth = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(authStatus);
  let role = useAppSelector(userRole);

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(fetchUser());
      dispatch(lookUpRole());
      dispatch(readPatient());
    }
  }, [loginStatus, dispatch]);

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(doctorSelection());
    }
  }, [loginStatus, dispatch]);

  if (role === "" || undefined) {
    role = "admin";
    return role;
  } else {
    return role;
  }
};
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const patient = useAppSelector(showOnePatient);

  const roleUser = RoleAuth();

  useEffect(() => {
    if (roleUser === "patient") {
      if (patient?.id !== undefined || null) {
      } else {
        navigate("/SignUpInfo");
      }
    }
  }, [roleUser, dispatch]);

  useEffect(() => {
    if (roleUser === "doctor") {
      dispatch(readDoctor());
    }
  }, [roleUser, dispatch]);

  return (
    <div className="signUp_component">
      <NavBar />
      {UseAuth() && (
        <div className="general_container">
          <Sidebar />
          <div className="appointment_area">
            <form className="form_style">
              <div className="top-form">
                <h1>Welcome!</h1>
                <h1> {roleUser}</h1>
              </div>
              <div className="bottom-form"></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
