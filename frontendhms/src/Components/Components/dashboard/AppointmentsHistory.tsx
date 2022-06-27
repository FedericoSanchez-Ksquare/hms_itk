import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import NavBar from "../NavBar";
import {
  fetchAllAppointments,
  selectAppointments,
  fetchPatientAppointments,
  fetchDoctorAppointments,
  enableAppointment,
} from "../../slices/appointmentsSlice";
import Sidebar, { RoleAuth } from "../Sidebar";
import { showDoctors } from "../../slices/doctorSlice";
import { fetchAllPatients, showPatients } from "../../slices/patientSlice";
import { useForm } from "react-hook-form";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

const AppointmentsHistory = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const roleUser = RoleAuth();

  useEffect(() => {
    if (roleUser === "admin") {
      dispatch(fetchAllPatients());
      dispatch(fetchAllAppointments("is_deleted=true"));
    }
  }, [roleUser, dispatch]);
  useEffect(() => {
    if (roleUser === "patient") {
      dispatch(fetchPatientAppointments("is_deleted=true"));
    }
  }, [roleUser, dispatch]);

  useEffect(() => {
    if (roleUser === "doctor") {
      dispatch(fetchAllPatients());
      dispatch(fetchDoctorAppointments("is_deleted=true"));
    }
  }, [roleUser, dispatch]);

  let doctors = useAppSelector(showDoctors);
  let patients = useAppSelector(showPatients);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      editable: false,
      sortable: false,
      minWidth: 100,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: false,
      editable: false,
      minWidth: 100,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      sortable: false,
      editable: false,
      minWidth: 100,
    },
    {
      field: "active",
      headerName: "Is Disabled?",
      flex: 1,
      sortable: false,
      editable: false,
      minWidth: 100,
    },
  ];

  const appointment = useAppSelector(selectAppointments);

  let list: any;

  if (roleUser === "doctor") {
    list = appointment.map((value) => ({
      id: value.id,
      date: value.appointmentDate,
      time: value.appointmentTime,
      active: value.is_deleted,
      patient: patients[value.patientId - 1].firstName,
    }));

    columns.push(
      {
        field: "patient",
        headerName: "Patient",
        flex: 1,
        editable: false,
        minWidth: 100,
      },
      {
        field: "info",
        headerName: "Update Info",
        flex: 1,
        sortable: false,
        editable: false,
        minWidth: 100,
        renderCell: (cellValues) => {
          return (
            <Link to={`/readAppointment/${cellValues.row.id}`}>
              <button>Info</button>
            </Link>
          );
        },
      },
      {
        field: "cancel",
        headerName: "Cancel/Enable Appointment",
        flex: 1,
        sortable: false,
        editable: false,
        minWidth: 200,
        renderCell: (cellValues) => {
          return (
            <button
              onClick={(e: any) => {
                e = Number(cellValues.row.id);
                if (cellValues.row.active === "true") {
                  dispatch(enableAppointment(e));
                  dispatch(fetchDoctorAppointments("is_deleted=true"));
                }
              }}
            >
              Cancel/Enable
            </button>
          );
        },
      }
    );
  } else if (roleUser === "patient") {
    list = appointment.map((value) => ({
      id: value.id,
      date: value.appointmentDate,
      time: value.appointmentTime,
      active: value.is_deleted,
      doctor: doctors[value.doctorId - 1].firstName,
    }));

    columns.push(
      {
        field: "doctor",
        headerName: "Doctor",
        flex: 1,
        editable: false,
        minWidth: 100,
      },
      {
        field: "cancel",
        headerName: "Cancel/Enable Appointment",
        flex: 1,
        sortable: false,
        editable: false,
        minWidth: 200,
        renderCell: (cellValues) => {
          return (
            <button
              onClick={(e: any) => {
                e = Number(cellValues.row.id);
                if (cellValues.row.active === "true") {
                  dispatch(enableAppointment(e));
                  dispatch(fetchPatientAppointments("is_deleted=true"));
                }
              }}
            >
              Cancel/Enable
            </button>
          );
        },
      }
    );
  } else if (roleUser === "admin") {
    list = appointment.map((value) => ({
      id: value.id,
      date: value.appointmentDate,
      time: value.appointmentTime,
      active: value.is_deleted,
      doctor: doctors[value.doctorId - 1].firstName,
      patient: patients[value.patientId - 1].firstName,
    }));

    columns.push({
      field: "doctor",
      headerName: "Doctor",
      flex: 1,
      editable: false,
      minWidth: 100,
    });
    columns.push({
      field: "patient",
      headerName: "Patient",
      flex: 1,
      editable: false,
      minWidth: 100,
    });
  }

  return (
    <div className="appointment">
      <NavBar />
      <div className="general_container">
        <Sidebar />
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
          <label>Want to see upcoming appointments?</label>
          <label>Click here!</label>
          <Link to={"/dashboard/appointments"}>
            <button>Upcoming Appointments</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsHistory;
