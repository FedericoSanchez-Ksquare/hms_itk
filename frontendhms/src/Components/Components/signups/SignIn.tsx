import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebaseconf";
import { initializeApp } from "firebase/app";
import {  loginSuccess } from "../../slices/authSlice";
import {
  IUser,
} from "../../slices/userSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { readPatient } from "../../slices/patientSlice";

const SignIn = () => {
  const firebaseApp = initializeApp(firebaseConfig);

  const aut = getAuth(firebaseApp);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const LoginFB = async (values: Partial<IUser>) => {
    try {
      const user = await signInWithEmailAndPassword(
        aut,
        String(values.email),
        String(values.password)
      );
      const token = await user.user.getIdToken();

      dispatch(
        loginSuccess({
          accessToken: token,
          uid: String(user.user.uid),
          email: String(user.user.email),
          isDisabled: false,
        })
      );
      
      navigate("/dashboard");
    } catch (error) {
      alert("bad login")
    }
  };
  return (
    <div className="signUp_component">
      <NavBar />
      <div className="general_container">
        <div className="sign_area">
          <form className="form_style" onSubmit={handleSubmit(LoginFB)}>
            <div className="top-form">
              <label>Sign in with your email or username!</label>
            </div>
            <br />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              {...register("email") }
            required =  {true}
            />
            {errors.email && errors.email.message}
            <br />
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              required = {true}
              placeholder="Enter your password"
            />
            <br />
            <div className="bottom-form">
              <input type={"submit"} value="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
