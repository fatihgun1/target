import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    badges :[{name: null,description: null,owner: null,score: null,mediaUrl: null}],
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };

export const getBadgesByUser = createAsyncThunk('getBadgesByUser', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/badge/all/${user.user}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})

export const createBadge = createAsyncThunk('createBadge', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/badge/create`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const updateBadge = createAsyncThunk('updateBadge', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/badge/update`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const deleteBadge = createAsyncThunk('deleteBadge', async (payload) => {
    console.log(payload);
    try{
        const response = await axios.post(`http://localhost:8080/badge/delete`, payload, headers)
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
        //GET TODOS
        builder.addCase(getBadgesByUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getBadgesByUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.badges = action.payload
                state.success = true;
            }
        });
        builder.addCase(getBadgesByUser.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //CREATE TODOS
        builder.addCase(createBadge.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createBadge.fulfilled,(state,action)=>{
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
        builder.addCase(createBadge.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE TODOS 
        builder.addCase(updateBadge.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBadge.fulfilled,(state,action)=>{
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
        builder.addCase(updateBadge.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE TODOS
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