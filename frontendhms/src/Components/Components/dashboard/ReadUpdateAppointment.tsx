import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  appointmentDetails,
  getPatientAppointment,
  IAppointment,
  updateAppointment,
} from "../../slices/appointmentsSlice";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { authStatus } from "../../slices/authSlice";

const ReadUpdateAppointment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { appointmentId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(authStatus);

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(getPatientAppointment(info.id));
    }
  }, [loginStatus, dispatch]);

  const appointmentInfo = useAppSelector(appointmentDetails);

  type appointment = {
    id: number;
    appointmentDate: string;
    appointmentTime: string;
    is_deleted: string;
  };
  let info: appointment = {
    id: Number(appointmentId),
    appointmentDate: String(appointmentInfo?.appointmentDate),
    appointmentTime: String(appointmentInfo?.appointmentTime),
    is_deleted: String(appointmentInfo?.is_deleted),
  };

  const Update = (values: Partial<IAppointment>) => {
    values.id = info.id;
    dispatch(updateAppointment(values));
    navigate("/dashboard/appointments");
  };

  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <Sidebar />
        <div className="appointment_area">
          {loginStatus === "completed" && (
            <div className="container-register">
              <form className="form_style" onSubmit={handleSubmit(Update)}>
                <div className="top-form">
                  <label>Your appointment {info.id}</label>
                </div>
                <br />
                <div>
                  <br />
                  <label>Current Date: </label>
                  <label htmlFor=""> {info.appointmentDate} </label>
                  <input
                    type="date"
                    placeholder="Choose a new date"
                    {...register("appointmentDate")}
                    required={true}
                  />
                  <br />
                  <label>Current Time: </label>
                  <label htmlFor=""> {info.appointmentTime} </label>
                  <br />
                  <input
                    type="time"
                    id="time"
                    placeholder="Choose the time"
                    {...register("appointmentTime")}
                    required={true}
                  />
                  <br />
                </div>
                <br />
                <br />
                <div className="bottom-form">
                  <input type={"submit"} value="Update" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadUpdateAppointment;
