import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import { selectUID } from "./Components/slices/authSlice";

export const UseAuth = () =>{
    const uidLoggedIn = useAppSelector(selectUID);
    return uidLoggedIn
}

const ProtectedRoutes = () => {
    const isAuth = UseAuth()

  return  isAuth ? <Outlet /> : <Navigate to="/"/>
}

export default ProtectedRoutes
