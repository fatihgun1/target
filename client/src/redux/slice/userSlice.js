import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState :{
        user : null,
        isLogin : false,
        token: null
    },
    reducers:{
        logout : (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.user = null;
            state.isLogin = false;
            state.token= null
        }
    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;