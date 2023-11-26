import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos : [{name: null,code: null}],
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };


export const createStatus = createAsyncThunk('createStatus', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/status/create`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;

    }
})

export const updateStatus = createAsyncThunk('updateStatus', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/status/update`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const deleteStatus = createAsyncThunk('deleteStatus', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/status/delete`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const statusSlice = createSlice({
    name:'status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //CREATE Status
        builder.addCase(createStatus.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(createStatus.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE Status 
        builder.addCase(updateStatus.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(updateStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(updateStatus.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //DELETE Status
        builder.addCase(deleteStatus.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(deleteStatus.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default statusSlice.reducer;