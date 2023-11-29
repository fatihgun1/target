import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    profile:{fullName:null,title:null,profileScore:null,mediaUrl:null,bio:null,owner:null},
    loading:false,
    success:false,
    error:null
}

const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };

export const getProfile = createAsyncThunk('createMedia', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/profile/${user.user}`, null, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})


export const updateProfile = createAsyncThunk('updateProfile', async (payload) => {
    payload.owner= user.user;
    console.log(payload);
    try{
        const response = await axios.post(`http://localhost:8080/profile/update`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get profile
        builder.addCase(getProfile.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
                state.profile = action.payload;
            }
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(getProfile.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // Update todo
        builder.addCase(updateProfile.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            console.log(action.payload);
            if(action.payload.status !== "BAD_REQUEST"){
                state.success = true;
                state.profile = action.payload;
            }else{
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(updateProfile.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})

export default profileSlice.reducer;