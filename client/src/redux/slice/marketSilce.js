import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    market:{totalPage:null,pageSize:null,currentPage:null,
        entries: [{
            code:null,
            name:null,
            owner:null,
            status: [{
                code:null,
                name:null,
                score:null
            }],
            badges: [{
                code:null,
                name:null,
                description:null,
                owner:null,
                score:null,
                mediaUrl:null
            }]
        }]},
    loading: false,
    success: false,
    error: null
}

//*********************CONTAINER*****************************
export const getMarket = createAsyncThunk('getMarket', async (payload) => {
    console.log(process.env);
    try {
        const response = await axiosInstance.post(`/market/m`, payload)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const publishContainer = createAsyncThunk('publishContainer', async (payload) => {
    try {
        const response = await axiosInstance.post(`/market/p`, payload)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const buyContainer = createAsyncThunk('buyContainer', async (payload) => {
    try {
        const response = await axiosInstance.post(`/market/b`, payload)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const marketSilce = createSlice({
    name: 'market',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //get pack
        builder.addCase(getMarket.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getMarket.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
                state.market=action.payload
            }else{
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(getMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // crate contaienr
        builder.addCase(publishContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(publishContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(publishContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // get contaienr
        builder.addCase(buyContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(buyContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(buyContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });


    }
})

export default marketSilce.reducer;