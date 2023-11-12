import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: null,
    success :false,
}

export const fetchRegister = createAsyncThunk('fetchRegister', async (credential) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', credential)
        return response.data;
    } catch (err) {
        
    }
})

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.pending, (state, action) => {
            state.loading = true;
            state.error = "1";
            state.success = false
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "2";
            if(action.payload){
                state.success= true
            }
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
});

export default registerSlice.reducer;