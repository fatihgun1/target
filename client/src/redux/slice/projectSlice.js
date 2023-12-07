import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    projects : [{name: null,code: null}],
    project: {name: null,code: null,owner: null,
        status: [{ code: null, name: null, score: null }],
        todos: [{ description: null,status: { code: null, name: null, score: null },code: null}]
},
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };

export const getProjectByCode = createAsyncThunk('getProjectByCode', async (code) => {
    try{
        const response = await axios.get(`http://localhost:8080/project/get/${code}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})


export const getProject = createAsyncThunk('getProject', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/project/all/${user.user}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})

export const createProject = createAsyncThunk('createProject', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/project/create`, payload, headers)
        
        return response.data;
    }catch(err){
        console.log("dfsfsfsdfsdf",err);
        return err;
    }
})

export const updateProject = createAsyncThunk('updateProject', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/project/update`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const deleteProject = createAsyncThunk('deleteProject', async (payload) => {
    console.log(payload);
    try{
        const response = await axios.post(`http://localhost:8080/project/delete`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const projectSlice = createSlice({
    name:'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET PROJECT
        builder.addCase(getProject.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getProject.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.projects = action.payload
                state.success = true;
            }
        });
        builder.addCase(getProject.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // GET STATUS BY CODE
        builder.addCase(getProjectByCode.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getProjectByCode.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
            if(action.payload){
                state.project = action.payload
            }
        });
        builder.addCase(getProjectByCode.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //CREATE PROJECT
        builder.addCase(createProject.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createProject.fulfilled,(state,action)=>{
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
        builder.addCase(createProject.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE PROJECT 
        builder.addCase(updateProject.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProject.fulfilled,(state,action)=>{
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
        builder.addCase(updateProject.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE PROJECT
        builder.addCase(deleteProject.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteProject.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(deleteProject.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default projectSlice.reducer;