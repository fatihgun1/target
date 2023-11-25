import { configureStore } from "@reduxjs/toolkit";
import  registerSlice  from "./slice/registerSlice";
import  loginSlice  from "./slice/loginSlice";
import  userSlice  from "./slice/userSlice";
import todosSlice from "./slice/todosSlice";
import statusSlice from "./slice/statusSlice";
import todoSlice from "./slice/todoSlice";
import achievementSlice from "./slice/achievementSlice";
import badgeSlice from "./slice/badgeSlice";
export default configureStore({
    reducer : {
        register:registerSlice,
        login:loginSlice,
        user:userSlice,
        todos:todosSlice,
        todo:todoSlice,
        status:statusSlice,
        achievement:achievementSlice,
        badge:badgeSlice
    }
})