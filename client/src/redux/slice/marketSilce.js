import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const user = JSON.parse(localStorage.getItem('user'));

const headers = {
    headers: {
        'Authorization': `Bearer ${user ? user.token : null}`
    }
};


//*********************CONTAINER*****************************
export const getMarket = createAsyncThunk('getMarket', async (payload) => {
    try {
        const response = await axios.post(`http://localhost:8080/market/m`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const publishContainer = createAsyncThunk('publishContainer', async (payload) => {
    try {
        const response = await axios.post(`http://localhost:8080/market/p`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const buyContainer = createAsyncThunk('buyContainer', async (payload) => {
    try {
        payload.owner = user.user;
        const response = await axios.post(`http://localhost:8080/market/b`, payload, headers)
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