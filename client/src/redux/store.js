import { configureStore } from "@reduxjs/toolkit";
import  registerSlice  from "./slice/registerSlice";
import  loginSlice  from "./slice/loginSlice";
import  userSlice  from "./slice/userSlice";
import statusSlice from "./slice/statusSlice";
import todoSlice from "./slice/todoSlice";
import achievementSlice from "./slice/achievementSlice";
import mediaSlice from "./slice/mediaSlice";
import profileSlice from "./slice/profileSlice";
import projectSlice from "./slice/projectSlice";
import packSlice from "./slice/packSlice";
export default configureStore({
    reducer : {
        register:registerSlice,
        login:loginSlice,
        user:userSlice,
        project:projectSlice,
        todo:todoSlice,
        status:statusSlice,
        achievement:achievementSlice,
        media:mediaSlice,
        profile:profileSlice,
        pack:packSlice
    }
})