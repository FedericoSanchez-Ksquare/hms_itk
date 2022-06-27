import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../../app/store";

export interface IPatient{
    id: number,
    firstName: string,
    lastName: string,
    userId: string,
    birth: string,
    weigth: number, 
    height: number, 
    gender: string,
    address: string,
}

export interface patientState {
    patients: IPatient[];
    status: 'idle' | 'loading' | 'completed' |  'failed';
    patientDetails: IPatient | null;
}

const initialState: patientState = {
    patients:[],
    status:'idle',
    patientDetails:null
}

export const createPatient = createAsyncThunk('posts/createPatient',async (body: Partial<IPatient>, thunkApi) => {
    const headers = {
    'Content-Type': 'application/json',
};
    const state = thunkApi.getState() as RootState;
    
    const req = await axios({
        method: 'POST',
        url: 'http://localhost:5000/patient',
        data: body ={
            firstName: body.firstName,
            lastName: body.lastName,
            birth: body.birth,
            weigth: body.weigth, 
            height: body.height, 
            gender: body.gender,
            address: body.address,
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

export const fetchAllPatients = createAsyncThunk('patients/list'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const uid = state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/patient/`, {headers});
    return req.data;
})

export const readPatient = createAsyncThunk('patient/details'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const userId = state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/patient/${userId}`, {headers});
    return req.data;
})

export const patientSlice = createSlice({
    name:'patient',
    initialState,
    reducers:{
        clearPatientState: (state) =>{
    state.patientDetails= null;
    state.patients = [];
    state.status = "idle";
}
    },
    extraReducers: (builder) =>{
        builder.addCase(createPatient.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(createPatient.fulfilled, (state, action)=>{
            state.status ="completed"
            state.patientDetails = action.payload
        })

        builder.addCase(createPatient.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(fetchAllPatients.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchAllPatients.fulfilled, (state, action)=>{
            state.status ="completed"
            state.patients = action.payload
        })

        builder.addCase(fetchAllPatients.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(readPatient.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(readPatient.fulfilled, (state, action)=>{
            state.status ="completed"
            state.patientDetails = action.payload
        })

        builder.addCase(readPatient.rejected, (state)=>{
            state.status ="failed"
        })
    }
})

export const showPatients = (state: RootState) => state.patient.patients;
export const showOnePatient = (state: RootState) => state.patient.patientDetails;
export const patientStatus = (state: RootState) => state.patient.status;
export const {clearPatientState} = patientSlice.actions

export default patientSlice.reducer;
