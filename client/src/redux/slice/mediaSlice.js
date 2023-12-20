import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    media:{url:null},
    loading:false,
    success:false,
    error:null
}


export const createMedia = createAsyncThunk('createMedia', async (payload) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_MEDIA_URL}`, payload)
        return response.data;
    }catch(err){
        return err.response.data;
    }
})

export const mediaSlice = createSlice({
    name:'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //CREATE Media
        builder.addCase(createMedia.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
            state.media = null;
        });
        builder.addCase(createMedia.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.success = true;
                state.media = action.payload;
            }
            if(action.payload.status === "BAD_REQUEST"){
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(createMedia.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})

export default mediaSlice.reducer;