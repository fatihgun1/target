import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

export const userSlice = createSlice({
    name:'user',
    initialState :{
        user : null,
        isLogin : false,
        token: null
    },
    reducers:{
        currentUser: (state) =>{
            let token = JSON.parse(localStorage.getItem('token'));
            if(token){
                const user = decodeToken(token.token);
                state.user = user.sub
                state.isLogin = true;
                state.token = token.token;
            }
        },
        logout : (state) => {
            localStorage.removeItem('token')
            state.user = null;
            state.isLogin = false;
        }
    }
});

export const {currentUser,logout} = userSlice.actions;
export default userSlice.reducer;