import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    achievements : [{ name: null, totalScore: null }],
    achievement : { name: null, totalScore: null },
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

const headers =  { 
    headers: {
         'Authorization': `Bearer ${user ? user.token :null}`
} };

export const calculateScore = createAsyncThunk('calculateScore', async (payload) => {
    try{
        const response = await axios.post(`http://localhost:8080/achievement/calculate`,payload,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})


export const getAchievemnetByUser = createAsyncThunk('getAchievemnetByCode', async () => {
    try{
        const response = await axios.get(`http://localhost:8080/achievement/all/${user.user}`,headers)
        return response.data;
       
    }catch(err){
        console.log(err);
    }
})


export const achievementSlice = createSlice({
    name:'achievement',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET BADGE
        builder.addCase(getAchievemnetByUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getAchievemnetByUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            if(action.payload){
                state.achievements = action.payload
                state.success = true;
            }
        });
        builder.addCase(getAchievemnetByUser.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // GET STATUS BY CODE
        builder.addCase(calculateScore.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(calculateScore.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
            if(action.payload){
                state.achievement = action.payload
            }
        });
        builder.addCase(calculateScore.rejected,(state,action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})


export default achievementSlice.reducer;