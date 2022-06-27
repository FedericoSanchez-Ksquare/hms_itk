import { useEffect } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  createAppointment,
  IAppointment,
} from "../../slices/appointmentsSlice";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { doctorSelection, showDoctors } from "../../slices/doctorSlice";
import { authStatus } from "../../slices/authSlice";

const CreateAppointments = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(authStatus);

  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(doctorSelection());
    }
  }, [loginStatus, dispatch]);

  let doctor = useAppSelector(showDoctors);
  if (typeof doctor === "string") {
    doctor = [];
  }
  const list = doctor.map((value) => (
    <option value={Number(value?.id)}>
      Doctor : {value?.firstName} {value?.lastName}{" "}
    </option>
  ));

  const create = async (values: Partial<IAppointment>) => {
    dispatch(createAppointment(values));
    navigate("/dashboard/appointments");
  };

  let date = new Date();

  let myDate =
    date.getUTCFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getUTCDate()).slice(-2);

  return (
    <>
      <NavBar />
      <div className="createAppointment">
        <div className="general_container">
          <Sidebar />
          <div className="appointment_area">
            <form className="form_style" onSubmit={handleSubmit(create)}>
              <div className="top-form">
                <label>Schedule your appointment</label>
              </div>
              <br />
              <div>
                <br />
                <div>
                  <label>Appointment Date </label>
                  <input
                    type="date"
                    placeholder="Choose a date"
                    {...register("appointmentDate", {
                      validate: (value) => value >= myDate,
                    })}
                    required={true}
                  />
                  <label>Appointment Time </label>
                  <input
                    type="time"
                    placeholder="Choose the time"
                    {...register("appointmentTime", {})}
                    required={true}
                  />
                </div>

                <br />
              </div>
              <br />
              <select {...register("id")}>{list}</select>
              <br />
              <label>Appointment Details</label>
              <input
                type="text"
                placeholder="Details of the appointment"
                {...register("appointmentDetails", {})}
                required={true}
              />

              <br />
              <div className="bottom-form">
                <input type={"submit"} value="Create Appoinment" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAppointments;
