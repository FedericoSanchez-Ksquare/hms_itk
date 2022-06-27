import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { authStatus } from "../../slices/authSlice";
import { fetchAllPatients, patientStatus, showPatients } from "../../slices/patientSlice";
import NavBar from "../NavBar"
import Sidebar from "../Sidebar"

const Patients = () => {
    const dispatch = useAppDispatch()
    const loginStatus = useAppSelector(authStatus);
    let patientIn = useAppSelector(patientStatus);

    const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      editable: false,
      minWidth: 100
    },
    {
      field: "height",
      headerName: "Height",
      flex: 1,
      editable: false,
      minWidth: 100
    },
  ];

  
    useEffect(() => {
        if (loginStatus === 'completed') {
          dispatch(fetchAllPatients());
          patientIn = "idle"
        }
    }, [loginStatus, dispatch])
    let users = useAppSelector(showPatients)
    if(typeof users === "string"){
        users = []
    }

    const list = users.map((value) => (
       {
       id: value.id,
       firstName: value.firstName,
       lastName: value.lastName,
       weight: value.weigth,
       height: value.height
      }
  
  ))
  return (
     <>
    <NavBar/>
    <div className="patients">
        <div className="general_container">
          <Sidebar/>
          <div className="appointment_area">
            <div className="size">
            <DataGrid
              sx={{ boxShadow: 2, border: 2, bgcolor: "beige" }}
              rows={list}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          </div>
        
      </div>
      </div>
    </>
  )
}


export default Patients