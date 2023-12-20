import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    todo: [{ description: null, status: { code: null, name: null, score: null }, code: null }],
    loading: false,
    success: false,
    error: null
}

export const createTodo = createAsyncThunk('createTodo', async (payload) => {
    try {
        const response = await axiosInstance.post(`/todo/create`, payload)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const updateTodo = createAsyncThunk('updateTodo', async (payload) => {
    try {
        const response = await axiosInstance.post(`/todo/update`, payload)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const deleteTodo = createAsyncThunk('deleteTodo', async (payload) => {
    try {
        const response = await axiosInstance.post(`/todo/delete`, payload)
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //CREATE TODO
        builder.addCase(createTodo.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.success = true;
            }
            if (action.payload.status === "BAD_REQUEST") {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(createTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //UPDATE TODO 
        builder.addCase(updateTodo.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.success = true;
            }
            if (action.payload.status === "BAD_REQUEST") {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
        });
        //DELETE TODO
        builder.addCase(deleteTodo.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.success = true;
            }
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})

export default todoSlice.reducer;