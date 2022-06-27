import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { userRole } from '../slices/userSlice'

export const RoleAuth = () => {
  let  role = useAppSelector(userRole)
  if (role === "" || undefined)
  {
    role = "admin"
    return role
  }
  else
  {
    return role
  }

}

const Sidebar = () => {
  const roleUser = RoleAuth() 
  return (
    <div className='sidebar'>
      <div className='sidebar_content'>
        <div>
          <h1>Navigation Sidebar</h1>
        </div>
        {
          roleUser ==="patient" &&
          <>
          <Link to="/dashboard/createAppointemnt"><button className='sidebar_buttons'> Create Appointments</button></Link>
          <Link to="/dashboard/appointments"><button className='sidebar_buttons'> Show Appointments</button></Link>
          </>
          
        }
        {
          roleUser === "doctor" &&
          <Link to="/dashboard/appointments"><button className='sidebar_buttons'> Show Appointments</button></Link>
        }
         {
          roleUser === "admin"  &&
          <>
          <Link to="/dashboard/appointments"><button className='sidebar_buttons'> Show Appointments</button></Link>
          <Link to="/dashboard/admin/patients"><button className='sidebar_buttons'> Show Patients</button></Link>
          <Link to="/dashboard/admin/doctors"><button className='sidebar_buttons'> Show Doctors</button></Link>
          <Link to="/dashboard/admin/users"><button className='sidebar_buttons'> Show Users</button></Link>
          <Link to="/signUpDoctor"><button className='sidebar_buttons'> Create Doctor</button></Link>
          
          </>
        }

        
        <Link to="/profile"><button className='sidebar_buttons'> Profile</button></Link>
      </div>
    </div>
  )
}



export default Sidebar