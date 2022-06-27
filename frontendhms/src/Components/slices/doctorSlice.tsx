import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../../app/store";

export interface IDoctor{
    id: number,
    firstName: string,
    lastName: string,
    userId: string,
    medicalSpeciality: string
}

export interface doctorState {
    doctors: IDoctor[];
    status: 'idle' | 'loading' | 'completed' |  'failed';
    doctorDetails: IDoctor | null;
}

const initialState: doctorState = {
    doctors:[],
    status:'idle',
    doctorDetails:null
}

export const createDoctor = createAsyncThunk('doctor/createDoctor',async (body: Partial<IDoctor>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const req = await axios({
        method: 'POST',
        url: 'http://localhost:5000/doctor',
        data: body ={
            firstName: body.firstName,
            lastName: body.lastName,
            medicalSpeciality: body.medicalSpeciality,
            userId: String(state.user.users),
        },
        headers: headers
    })
    if (req.status === 403) {
        return null
    }else{
        return req.data   
    }
})

export const fetchDoctors = createAsyncThunk('doctors/list'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const req = await axios.get(`http://localhost:5000/doctor/`, {headers});
    return req.data;
})

export const readDoctor = createAsyncThunk('doctor/details'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const userId = state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/doctor/list/${userId}`, {headers});
    return req.data;
})

export const doctorSelection = createAsyncThunk('doctor/selection'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const userId = state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/doctor/`, {headers});
    return req.data;
})

export const doctorSlice = createSlice({
    name:'doctor',
    initialState,
    reducers:{
        clearDoctorState: (state) =>{
    state.doctorDetails = null;
    state.doctors = [];
    state.status = "idle";
}
    },
    extraReducers: (builder) =>{
        builder.addCase(createDoctor.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(createDoctor.fulfilled, (state, action)=>{
            state.status ="completed"
            state.doctorDetails = action.payload
        })

        builder.addCase(createDoctor.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(fetchDoctors.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchDoctors.fulfilled, (state, action)=>{
            state.status ="completed"
            state.doctors = action.payload
        })

        builder.addCase(fetchDoctors.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(readDoctor.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(readDoctor.fulfilled, (state, action)=>{
            state.status ="completed"
            state.doctorDetails = action.payload
        })

        builder.addCase(readDoctor.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(doctorSelection.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(doctorSelection.fulfilled, (state, action)=>{
            state.status ="completed"
            state.doctors = action.payload
        })

        builder.addCase(doctorSelection.rejected, (state)=>{
            state.status ="failed"
        })
    }
})

export const showDoctors = (state: RootState) => state.doctor.doctors;
export const showOneDoctor = (state: RootState) => state.doctor.doctorDetails;
export const doctorStatus = (state: RootState) => state.doctor.status;
export const {clearDoctorState} = doctorSlice.actions

export default doctorSlice.reducer;
