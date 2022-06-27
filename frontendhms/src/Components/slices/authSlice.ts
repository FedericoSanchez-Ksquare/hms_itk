import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IAuthState{
    uid: string,
    accessToken: string,
    email: string,
    isDisabled: boolean
}

export interface AuthState {
    auths: IAuthState[],
    status: 'idle' | 'loading' | 'completed' |  'failed';
    authDetails: IAuthState | null;
}

const initialState: AuthState = {
    auths:[],
    status: "idle",
    authDetails:null
}

export const loginSuccess = createAsyncThunk('login/user', 
async (body: 
    { uid: string, accessToken: string, email:string, isDisabled:boolean}
    , thunkApi ) => {
    const state = thunkApi.getState() as RootState;
    return body
})




export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        clearAuthState: (state) =>{
    state.authDetails = null;
    state.auths = [];
    state.status = "idle";
}
    },
    extraReducers: (builder) =>{
        builder.addCase(loginSuccess.pending, (state)=>{
            state.status ="loading"
        })

        builder.addCase(loginSuccess.fulfilled, (state, action)=>{
            state.status ="completed"
            state.authDetails = action.payload
        })

        builder.addCase(loginSuccess.rejected, (state)=>{
            state.status ="failed"
        })

    }
})



export const selectUID = (state: RootState) => state.auth.authDetails?.uid;
export const selectAccessToken = (state: RootState) => state.auth.authDetails?.accessToken;
export const selectEMAIL = (state: RootState)=> state.auth.authDetails?.email
export const authStatus = (state: RootState)=> state.auth.status
export const {clearAuthState} = authSlice.actions

export default authSlice.reducer