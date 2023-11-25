import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todo : [{ description: null,status: { code: null, name: null, score: null },code: null}],
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };

export const getTodoByCode = createAsyncThunk('getTodoByCode', async (code) => {
    try{
        const response = await axios.get(`http://localhost:8080/todos/get/${code}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})

export const getTodo = createAsyncThunk('getTodo', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/todos/all/${user.user}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})

export const createTodo = createAsyncThunk('createTodo', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/todo/create`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const updateTodo = createAsyncThunk('updateTodo', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/todo/update`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const deleteTodo = createAsyncThunk('deleteTodo', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/todo/delete`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET TODOS
        builder.addCase(getTodo.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.todo = action.payload
                state.success = true;
            }
        });
        builder.addCase(getTodo.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // GET STATUS BY CODE
        builder.addCase(getTodoByCode.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getTodoByCode.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
            if(action.payload){
                state.todo = action.payload
            }
        });
        builder.addCase(getTodoByCode.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //CREATE TODOS
        builder.addCase(createTodo.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(createTodo.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE TODOS 
        builder.addCase(updateTodo.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(updateTodo.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE TODOS
        builder.addCase(deleteTodo.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteTodo.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(deleteTodo.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default todoSlice.reducer;