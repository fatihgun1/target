import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos : [{name: null,code: null}],
    todosSingle: {name: null,code: null,owner: null,
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

export const getTodosByCode = createAsyncThunk('getTodosByCode', async (code) => {
    try{
        const response = await axios.get(`http://localhost:8080/todos/get/${code}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})


export const getTodos = createAsyncThunk('getTodos', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/todos/all/${user.user}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})

export const createTodos = createAsyncThunk('createTodos', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/todos/create`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const updateTodos = createAsyncThunk('updateTodos', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/todos/update`, payload, headers)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const deleteTodos = createAsyncThunk('deleteTodos', async (payload) => {
    console.log(payload);
    try{
        const response = await axios.post(`http://localhost:8080/todos/delete`, payload, headers)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET TODOS
        builder.addCase(getTodos.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getTodos.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.todos = action.payload
                state.success = true;
            }
        });
        builder.addCase(getTodos.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // GET STATUS BY CODE
        builder.addCase(getTodosByCode.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getTodosByCode.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
            if(action.payload){
                state.todosSingle = action.payload
            }
        });
        builder.addCase(getTodosByCode.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //CREATE TODOS
        builder.addCase(createTodos.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createTodos.fulfilled,(state,action)=>{
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
        builder.addCase(createTodos.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE TODOS 
        builder.addCase(updateTodos.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTodos.fulfilled,(state,action)=>{
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
        builder.addCase(updateTodos.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE TODOS
        builder.addCase(deleteTodos.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteTodos.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
            }
        });
        builder.addCase(deleteTodos.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default todosSlice.reducer;