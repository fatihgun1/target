import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    achievements : [{ name: null, totalScore: null }],
    achievement : { name: null, totalScore: null },
    loading:false,
    success:false,
    error:null
}
const user = JSON.parse(localStorage.getItem('user'));

export const getAchievemnetByUser = createAsyncThunk('getAchievemnetByCode', async () => {
    try{
        const response = await axiosInstance.get(`/achievement/all/${user.user}`)
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
    }
})


export default achievementSlice.reducer;