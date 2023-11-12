import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    token:null,
    refreshToken:null,
    loading:false,
    success:false,
    error:null
}

export const fetchLogin = createAsyncThunk('fetchLogin', async (credential) => {
    try{
        const response = await axios.post('http://localhost:8080/api/v1/auth/signin',credential);
        return response.data;
    }catch(err){

    }
})

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(fetchLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                localStorage.setItem('token',JSON.stringify(action.payload));
                state.success = true;
            }
        });
        builder.addCase(fetchLogin.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });

    }
})

export default loginSlice.reducer;