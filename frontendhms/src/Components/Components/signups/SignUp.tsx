import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  createUserDoctor,
  createUserPatient,
  IUser,
} from "../../slices/userSlice";
import NavBar from "../NavBar";
import { RoleAuth } from "../Sidebar";
import { UseAuth } from "../../../protectedRoutes";
import "../../layoutComponent/home.css";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerFB = async (values: Partial<IUser>) => {
    try {
      if (role === "admin") {
        dispatch(createUserDoctor(values));
        navigate("/SignUpInfoDoctor");
      } else {
        dispatch(createUserPatient(values));
        navigate("/SignUpInfo");
      }
    } catch (error) {
      alert("Bad sign up, try again!");
    }
  };

  const role = RoleAuth();
  const auth = UseAuth();

  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <div className="sign_area">
          {role === "admin" && (
            <>
              <form className="form_style" onSubmit={handleSubmit(registerFB)}>
                <div className="top-form">
                  <label>Create Doctor Account</label>
                </div>
                <br />
                <br />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  required={true}
                />
                {errors.email && errors.email.message}
                <br />
                <label>Username</label>
                <input
                  placeholder="Enter your Username"
                  {...register("displayName")}
                  required={true}
                />
                <br />
                <br />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  {...register("password")}
                  required={true}
                />
                <br />
                <div className="bottom-form">
                  <input type={"submit"} value="Sign Up" />
                </div>
              </form>
            </>
          )}
          {auth === undefined && (
            <>
              <form className="form_style" onSubmit={handleSubmit(registerFB)}>
                <div className="top-form">
                  <label>Create Account</label>
                </div>
                <br />

                <br />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  required={true}
                />
                {errors.email && errors.email.message}
                <br />
                <label>Username</label>
                <input
                  placeholder="Enter your Username"
                  {...register("displayName", {
                    validate: (value) => value !== "admin" || "nice try!",
                  })}
                  required={true}
                />
                <br />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  {...register("password")}
                  required={true}
                />
                <br />
                <div className="bottom-form">
                  <input type={"submit"} value="Sign Up" />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
