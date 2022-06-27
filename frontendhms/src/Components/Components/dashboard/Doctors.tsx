import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { authStatus } from "../../slices/authSlice";
import { fetchDoctors, showDoctors } from "../../slices/doctorSlice";
import NavBar from "../NavBar";
import Sidebar from "../Sidebar";

const Doctors = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(authStatus);
  useEffect(() => {
    if (loginStatus === "completed") {
      dispatch(fetchDoctors());
    }
  }, [loginStatus, dispatch]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      editable: false,
      minWidth: 100,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      editable: false,
      minWidth: 100,
    },
    {
      field: "medicalSpeciality",
      headerName: "Medical Speciality",
      flex: 1,
      editable: false,
      minWidth: 100,
    },
  ];

  let users = useAppSelector(showDoctors);
  if (typeof users === "string") {
    users = [];
  }
  const list = users.map((value) => ({
    id: value?.id,
    firstName: value.firstName,
    lastName: value?.lastName,
    medicalSpeciality: value?.medicalSpeciality,
  }));
  return (
    <div className="doctor_component">
      <NavBar />
      <div>
        <div className="general_container">
          <Sidebar />
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
    </div>
  );
};

export default Doctors;
