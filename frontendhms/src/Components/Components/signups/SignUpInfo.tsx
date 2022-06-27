import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  createPatient,
  IPatient,
  patientStatus,
} from "../../slices/patientSlice";

const SignUpInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(patientStatus);

  const createPatients = async (values: Partial<IPatient>) => {
    try {
      dispatch(createPatient(values));
      navigate("/");
      alert("Patient created")
    } catch (error) {
      alert("Bad sign up")
    }
  };

  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <div className="sign_area">
          <form className="form_style_patient" onSubmit={handleSubmit(createPatients)}>
            <div className="top-form">
              <label>Create Account</label>
            </div>
            <br />

            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your first Name"
              {...register("firstName")}
              required = {true}
            />
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter your last Name"
              {...register("lastName")}
              required = {true}
            />
            <br />
            <div className="patient_bot_info">
               <label>Weight</label>
            <input
              type={"number"}
              id="weight"
              placeholder="Input your Weight"
              {...register("weigth", {
                validate: (value) => value !== 0 || "Input valid weight!",
              })}
              required = {true}
            />

            <label>Height</label>
            <input
              type={"number"}
              id="height"
              placeholder="Input your Height"
              {...register("height", {
                validate: (value) => value !== 0 || "Input valid weight!",
              })}
              required = {true}
            />


            </div>
            <br />
            <div className="patient_bot_info">
              <label>Birth</label>
            <input
              placeholder="Input your Birth"
              id="birth"
              type={"date"}
              {...register("birth", {
                validate: (value) => value !== 0 || "Input valid Birth!",
              })}
              required = {true}
            />

            <label>Gender</label>
            <input
              placeholder="Input your Gender"
              id="gender"
              {...register("gender", {
                validate: (value) => value !== 0 || "Input valid Gender!",
              })}
              required = {true}
            />

            </div>
            

            
            <br />
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your Address"
              id="address"
              {...register("address")}
              required = {true}
            />
            <br />
            <div className="bottom-form">
              <input type={"submit"} value="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfo;
