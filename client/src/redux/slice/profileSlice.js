import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    profile:{fullName:null,title:null,profileScore:null,mediaUrl:null,bio:null,owner:null},
    loading:false,
    success:false,
    error:null
}

export const getProfile = createAsyncThunk('createMedia', async () => {
    try{
        const response = await axiosInstance.get(`/profile`)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})


export const updateProfile = createAsyncThunk('updateProfile', async (payload) => {
    try{
        const response = await axiosInstance.post(`/profile/update`, payload);
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
            if(action.payload && action.payload.status === "BAD_REQUEST"){
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
            if(action.payload && action.payload.status !== "BAD_REQUEST"){
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