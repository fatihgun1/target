import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    badges : {name: null,description: null,owner: null,score: null,mediaUrl: null},
    loading:false,
    success:false,
    error:null
}

export const createBadge = createAsyncThunk('createBadge', async (payload) => {
    try{
        const response = await axiosInstance.post(`/badge/create`, payload)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const updateBadge = createAsyncThunk('updateBadge', async (payload) => {
    try{
        const response = await axiosInstance.post(`/badge/update`, payload)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const deleteBadge = createAsyncThunk('deleteBadge', async (payload) => {
   
    try{
        const response = await axiosInstance.post(`/badge/delete`, payload)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const badgeSlice = createSlice({
    name:'badge',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //CREATE BADGE
        builder.addCase(createBadge.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createBadge.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }else{
                state.success = true;
            }
        });
        builder.addCase(createBadge.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE BADGE 
        builder.addCase(updateBadge.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBadge.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }else{
                state.success = true;
            }
        });
        builder.addCase(updateBadge.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE badege
        builder.addCase(deleteBadge.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteBadge.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;

            }
        });
        builder.addCase(deleteBadge.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default badgeSlice.reducer;