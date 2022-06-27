import NavBar from "../NavBar";
import Sidebar, { RoleAuth } from "../Sidebar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authStatus} from "../../slices/authSlice";
import { fetchUser, showUser } from "../../slices/userSlice";
import { readDoctor, showOneDoctor } from "../../slices/doctorSlice";
import { readPatient, showOnePatient } from "../../slices/patientSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(authStatus);
  const roleUser = RoleAuth();

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(fetchUser());
    }
  }, [loginStatus, dispatch]);
  useEffect(() => {
    if (roleUser === "patient") {
      dispatch(readPatient());
    }
  }, [loginStatus, dispatch]);
  useEffect(() => {
    if (roleUser === "doctor") {
      dispatch(readDoctor());
    }
  }, [loginStatus, dispatch]);

  let user = useAppSelector(showUser);
  let doctorInfo = useAppSelector(showOneDoctor);
  let patientInfo = useAppSelector(showOnePatient);
  

  type userFB = {
    uid: string;
    userName: string;
    email: string;
    firstNamePatient: string;
    lastNamePatient: string;
    lastNameDoctor: string;
    firstNameDoctor: string;
  };
  let fbUser: userFB = {
    uid: String(user?.uid),
    email: String(user?.email),
    userName: String(user?.userName),
    firstNamePatient: String(patientInfo?.firstName),
    lastNamePatient: String(patientInfo?.lastName),
    lastNameDoctor: String(doctorInfo?.firstName),
    firstNameDoctor: String(doctorInfo?.lastName),
  };
  
  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <Sidebar />
        <div className="appointment_area">
          <form className="form_style">
            <div className="top-form">
              <h1>Your profile!</h1>
            </div>
            <br />
            <br />
            <label>Email</label>
            <input
              readOnly
              defaultValue={fbUser.email}
            />
            <br />
            <label>Username</label>
            <input readOnly
              defaultValue={fbUser.userName} 
              />
            <br />
            {
              roleUser ==="patient" && <>
                <label>First Name</label>
            <input
              readOnly
              defaultValue={fbUser.firstNamePatient}
            />
            <br />
            <label>Last Name</label>
            <input readOnly
              defaultValue={fbUser.lastNamePatient} 
              />
              </>
            }
            {
              roleUser ==="doctor" && <>
                <label>First Name</label>
            <input
              readOnly
              defaultValue={fbUser.firstNameDoctor}
            />
            <br />
            <label>Last Name</label>
            <input readOnly
              defaultValue={fbUser.lastNameDoctor} 
              />
              </>
            }

            <br />
            <br />
            <div className="bottom-form"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
