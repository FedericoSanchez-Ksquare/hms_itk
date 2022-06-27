import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAppointmentState } from '../slices/appointmentsSlice';
import { clearAuthState, selectUID } from '../slices/authSlice';
import { clearDoctorState } from '../slices/doctorSlice';
import { clearPatientState } from '../slices/patientSlice';
import { clearUserState } from '../slices/userSlice';



const UseAuth = () =>{
    const uidLoggedIn = useAppSelector(selectUID);
    
  
    return uidLoggedIn
}
const NavBar = () => {
  const loggedIn = UseAuth()
  const page = useLocation()
  const dispatch = useAppDispatch();

  const LogOut = () => {
  
  
  dispatch(clearAuthState())
  dispatch(clearAppointmentState())
  dispatch(clearUserState())
  dispatch(clearDoctorState())
  dispatch(clearPatientState())

}
  return (
    <nav className="nav-bar">
        <div className="button_space">
          {
            (loggedIn === undefined && page.pathname !=="/SignUp" ) && 
            <Link to ="/SignUp"><button className='buttons_navbar'> Sign Up</button></Link>
          }
          {
            (loggedIn === undefined && page.pathname !=="/SignIn"  ) && 
            <Link to ="/SignIn"><button className='buttons_navbar'> Sign In</button></Link>
          }
          {
          page.pathname !== "/" && 
          <Link to ="/"><button className='buttons_navbar'>Home</button></Link>
          }
          {
            loggedIn && <Link to ="/" ><button className='buttons_navbar' onClick={LogOut} >LogOut </button></Link>
          }
        </div>
    </nav>
  )
}



export default NavBar

