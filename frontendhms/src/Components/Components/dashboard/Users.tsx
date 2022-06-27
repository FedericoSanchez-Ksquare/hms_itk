import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { authStatus } from "../../slices/authSlice";
import { fetchAllUsers, showUsers } from "../../slices/userSlice";
import NavBar from "../NavBar"
import Sidebar from "../Sidebar"


const Users = () => {
    const dispatch = useAppDispatch()
    const loginStatus = useAppSelector(authStatus);

    useEffect(() => {
        if (loginStatus === 'completed') {
          dispatch(fetchAllUsers());
        }
    }, [loginStatus, dispatch])

    const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "UID",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      editable: false,
      minWidth: 100
    },

  ];

  let users = useAppSelector(showUsers)
    if(typeof users === "string"){
        users = []
    }

  const list = users.map((value) => ({
        id: value.uid,
        email: value?.email,
        userName: value?.userName,
        role: value?.role
    }))
   
  return (

    
    <div className="signUp_component">
      <NavBar/>
        <div className="general_container">
          <Sidebar/>
        <div className="appointment_area">
          <div className="size">
            <DataGrid
              sx={{ boxShadow: 2, border: 2, bgcolor: "#81d2c7" }}
              rows={list}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
      </div>

  )
}


export default Users