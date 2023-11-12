import { configureStore } from "@reduxjs/toolkit";
import  registerSlice  from "./slice/registerSlice";
import  loginSlice  from "./slice/loginSlice";
import  userSlice  from "./slice/userSlice";
export default configureStore({
    reducer : {
        register:registerSlice,
        login:loginSlice,
        user:userSlice
    }
})