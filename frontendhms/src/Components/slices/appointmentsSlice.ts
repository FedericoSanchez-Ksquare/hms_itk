import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../../app/store";

export interface IAppointment{
    id: number,
    appointmentDate: string,
    appointmentTime: string,
    appointmentDetails: string,
    is_deleted: string,
    createdAt: string,
    patientId: number,
    doctorId: number,
}

export interface IFilters{
    id: number,
    order: string,
    orderBy: string,
    appointmentDate: string,
    appointmentTime: string,
    appointmentDetails: string,
    is_deleted: string,
    createdAt: string,
    limit: number,
    offset: number
}

export interface AppointmentState {
    appointments: IAppointment[];
    status: 'idle' | 'loading' | 'completed' |  'failed';
    appointmentDetails: IAppointment | null;
}

const initialState: AppointmentState = {
    appointments:[],
    status:'idle',
    appointmentDetails:null
}
export const fetchPatientAppointments = createAsyncThunk('appointments/fetchPatientAppointments', async (value:any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken ,
};
    const uid = state.auth.authDetails?.uid
    const patientId = state.patient.patientDetails?.id

    const req = await axios.get(`http://localhost:5000/appointment/patients/${uid}/${Number(patientId)}?${value}`, {headers});
    return req.data;
})

export const fetchDoctorAppointments = createAsyncThunk('appointments/fetchDoctorAppointments', async (value:any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken ,
};
    const uid = state.auth.authDetails?.uid
    const doctorId = state.doctor.doctorDetails?.id

    const req = await axios.get(`http://localhost:5000/appointment/doctors/${uid}/${doctorId}?${value}`, {headers});
    return req.data;
})

export const getPatientAppointment = createAsyncThunk('appointments/getPatientAppointment', async (appointmentId: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken ,
};
    const uid = state.auth.authDetails?.uid

    const req = await axios.get(`http://localhost:5000/appointment/${uid}/${appointmentId}`, {headers});
    return req.data;
})

export const fetchAllAppointments = createAsyncThunk('appointments/fetchAllappointments', async (value: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken ,
};

    const req = await axios.get(`http://localhost:5000/appointment/all?${value}`, {headers});
    return req.data;
})

export const allFilteredAppointments = createAsyncThunk('appointments/allFilteredAppointments', async (body: Partial<IFilters>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + state.auth.authDetails?.accessToken ,
};
    let selectedFilter 
    let selectedOrder
    let deleted
    if(body.orderBy !== null || undefined || "")
    {
        selectedFilter = body.orderBy
    }
    if(body.order !== null || undefined || "")
    {
        selectedOrder = body.order
    }
    if(body.is_deleted !== null || undefined || "")
    {
        deleted = body.is_deleted
    }
    

    const req = await axios.get(`http://localhost:5000/appointment/all/?orderBy=${selectedFilter}&order=${selectedOrder}&${deleted}&limit=&offset=`, {headers});
    return req.data;
})


export const updateAppointment = createAsyncThunk('appointments/updateAppointment',async (body: Partial<IAppointment>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken
    };
    const uid = state.auth.authDetails?.uid
    const req = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/appointment/${uid}/${body.id}` , 
        data: body,
        headers: headers
    })
    return req.data;
})

export const disableAppointment = createAsyncThunk('appointments/disableAppointment',async (value: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken
    };
    const uid = state.auth.authDetails?.uid
    const req = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/appointment/${uid}/${value}` , 
        data: {
            is_deleted: "true"
        },
        headers: headers
    })
    return req.data;
})
export const enableAppointment = createAsyncThunk('appointments/enableAppointment',async (value: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken
    };
    const uid = state.auth.authDetails?.uid
    const req = await axios({
        method: 'PATCH',
        url: `http://localhost:5000/appointment/${uid}/${value}` , 
        data: {
            is_deleted: "false"
        },
        headers: headers
    })
    return req.data;
})

export const createAppointment = createAsyncThunk('appointments/createAppointment',async (body: Partial<IAppointment>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken
    };
    const uid = state.auth.authDetails?.uid
    const req = await axios({
        method: 'POST',
        url: `http://localhost:5000/appointment/${uid}` , 
        data: body ={
            
            appointmentDate: body.appointmentDate,
            appointmentTime: body.appointmentTime,
            appointmentDetails: body.appointmentDetails,
            patientId: state.patient.patientDetails?.id,
            doctorId: body.id
        },
        headers: headers
    })
    return req.data;
})



export const appointmentSlice = createSlice({
    name:'appointment',
    initialState,
    reducers:{
        clearAppointmentState: (state) =>{
    state.appointmentDetails = null;
    state.appointments = [];
    state.status = "idle";
}
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchAllAppointments.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchAllAppointments.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointments = action.payload
        })

        builder.addCase(fetchAllAppointments.rejected, (state)=>{
            state.status ="failed"
        })

        builder.addCase(allFilteredAppointments.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(allFilteredAppointments.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointments = action.payload
        })

        builder.addCase(allFilteredAppointments.rejected, (state)=>{
            state.status ="failed"
        })

        builder.addCase(createAppointment.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(createAppointment.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointments = action.payload
        })

        builder.addCase(createAppointment.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(fetchPatientAppointments.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchPatientAppointments.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointments = action.payload
        })

        builder.addCase(fetchPatientAppointments.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(fetchDoctorAppointments.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchDoctorAppointments.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointments = action.payload
        })

        builder.addCase(fetchDoctorAppointments.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(getPatientAppointment.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(getPatientAppointment.fulfilled, (state, action)=>{
            state.status ="completed"
            state.appointmentDetails = action.payload
        })

        builder.addCase(getPatientAppointment.rejected, (state)=>{
            state.status ="failed"
        })

    }
})

export const selectAppointments = (state: RootState) => state.appointment.appointments;
export const appointmentDetails = (state: RootState) => state.appointment.appointmentDetails;
export const appointStatus = (state: RootState) => state.appointment.status;
export const {clearAppointmentState} = appointmentSlice.actions

export default appointmentSlice.reducer;