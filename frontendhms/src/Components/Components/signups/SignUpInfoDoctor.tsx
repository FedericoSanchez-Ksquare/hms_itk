import { useForm } from "react-hook-form";
import NavBar from "../NavBar";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createDoctor, doctorStatus, IDoctor } from "../../slices/doctorSlice";
import Sidebar from "../Sidebar";


const SignUpInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(doctorStatus)

  const createDoctors = async (values: Partial<IDoctor>) => {
    try {
      dispatch(createDoctor(values));
      if(status === "failed")
      {
        alert("doctor creation failed")
      }else{
        navigate("/dashboard/admin/doctors")
      }
    } catch (error) {
      alert("Bad sign up, try again!")
    }
  };

  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <Sidebar />
        <div className="sign_area">
          <form className="form_style" onSubmit={handleSubmit(createDoctors)}>
            <div className="top-form">
              <label>Create Account</label>
            </div>
            <br />
              <label>First Name</label>
              <input type="text" placeholder="Enter your first Name"
              {...register("firstName")}
              required = {true} />
              <br />
              <br />
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last Name"
              {...register("lastName")}
              required = {true} />
              <br />
              <br />
              <label>Medical Speciality</label>
              <input type="text" placeholder="Enter your speciality"
              {...register("medicalSpeciality")}
              required = {true} />
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
