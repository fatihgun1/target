import { configureStore } from "@reduxjs/toolkit";
import  registerSlice  from "./slice/registerSlice";
import  loginSlice  from "./slice/loginSlice";
import  userSlice  from "./slice/userSlice";
import todosSlice from "./slice/todosSlice";
import statusSlice from "./slice/statusSlice";
import todoSlice from "./slice/todoSlice";
import achievementSlice from "./slice/achievementSlice";
import badgeSlice from "./slice/badgeSlice";
import mediaSlice from "./slice/mediaSlice";
import profileSlice from "./slice/profileSlice";
export default configureStore({
    reducer : {
        register:registerSlice,
        login:loginSlice,
        user:userSlice,
        todos:todosSlice,
        todo:todoSlice,
        status:statusSlice,
        achievement:achievementSlice,
        badge:badgeSlice,
        media:mediaSlice,
        profile:profileSlice
    }
})