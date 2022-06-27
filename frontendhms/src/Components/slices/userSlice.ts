import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";

export interface IUser{
    id: number,
    uid: string,
    accessToken: string,
    userName: string,
    email: string, 
    password: string, 
    role: string,
    logged_in: boolean
}

export interface userState {
    users: IUser[];
    status: 'idle' | 'loading' | 'completed' |  'failed';
    userDetails: IUser | null;
}

const initialState: userState = {
    users:[],
    status:'idle',
    userDetails:null
}

export const lookUpRole = createAsyncThunk('user/fetchRole', async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    let userId=state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/users/${userId}`, {headers});
    return req.data
})

export const fetchAllUsers = createAsyncThunk('user/fetchUsers', async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const req = await axios.get('http://localhost:5000/users', {headers});
    return req.data;
})

export const fetchUser = createAsyncThunk('user'
, async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    const userId = state.auth.authDetails?.uid
    const req = await axios.get(`http://localhost:5000/users/${userId}`, {headers});
 
    return req.data;
})

export const createUserPatient = createAsyncThunk('user/createUserPatient',async (body: Partial<IUser>,thunkApi) => {
    const headers = {
    'Content-Type': 'application/json',
};
    const state = thunkApi.getState() as RootState;
    const req = await axios({
        method: 'POST',
        url: 'http://localhost:5000/users/patient',
        data: body,
        headers: headers
    })
    

    return req.data
})

export const createUserDoctor = createAsyncThunk('user/createUserDoctor',async (body: Partial<IUser>,thunkApi) => {
    
    const state = thunkApi.getState() as RootState;
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +state.auth.authDetails?.accessToken,
};
    
    const req = await axios({
        method: 'POST',
        url: 'http://localhost:5000/users/doctor',
        data: body,
        headers: headers
    })
    

    return req.data
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        clearUserState: (state) =>{
    state.userDetails = null;
    state.users = [];
    state.status = "idle";
}
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchAllUsers.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchAllUsers.fulfilled, (state, action)=>{
            state.status ="completed"
            state.users = action.payload
        })

        builder.addCase(fetchAllUsers.rejected, (state)=>{
            state.status ="failed"
        })

        builder.addCase(createUserPatient.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(createUserPatient.fulfilled, (state, action)=>{
            state.status ="completed"
            state.users = action.payload
        })

        builder.addCase(createUserPatient.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(createUserDoctor.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(createUserDoctor.fulfilled, (state, action)=>{
            state.status ="completed"
            state.users = action.payload
        })

        builder.addCase(createUserDoctor.rejected, (state)=>{
            state.status ="failed"
        })
         builder.addCase(lookUpRole.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(lookUpRole.fulfilled, (state, action)=>{
            state.status ="completed"
            state.userDetails = action.payload
        })

        builder.addCase(lookUpRole.rejected, (state)=>{
            state.status ="failed"
        })
        builder.addCase(fetchUser.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.status ="completed"
            state.userDetails = action.payload

        })

        builder.addCase(fetchUser.rejected, (state)=>{
            state.status ="failed"
        })
    }
})

export const showUser = (state: RootState) => state.user.userDetails;
export const userStatus = (state: RootState) => state.user.status;
export const userRole = (state: RootState) => state.user.userDetails?.role;
export const showUsers = (state: RootState)=> state.user.users;
export const {clearUserState} = userSlice.actions

export default userSlice.reducer;