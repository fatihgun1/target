import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    educations:[],
    loading: false,
    success: false,
    error: null
}

export const getEducations = createAsyncThunk('getEducations', async () => {
    try {
        const response = await axiosInstance.get(`/education/all`)
        return response.data;

    } catch (err) {
        console.log(err);
    }
})

export const createEducation = createAsyncThunk('createEducation', async (payload) => {
    try {
        const response = await axiosInstance.post(`/education/create`, payload)
        return response.data;

    } catch (err) {
        console.log(err);
    }
})
export const updateEducation = createAsyncThunk('updateEducation', async (payload) => {
    try {
        const response = await axiosInstance.post(`/education/update`, payload)
        return response.data;

    } catch (err) {
        console.log(err);
    }
})
export const deleteEducation = createAsyncThunk('deleteEducation', async (payload) => {
    try {
        const response = await axiosInstance.post(`/education/delete`, payload)
        return response.data;

    } catch (err) {
        console.log(err);
    }
})

export const educationSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        deleteEducationOnList: (state, action) => {
            let educationIndex = current(state.educations).findIndex(item => item.code === (action.payload.code));
            state.educations.splice(educationIndex, 1)

        },
        updateEducationOnList: (state, action) => {
            let educationIndex = current(state.educations).findIndex(item => item.code === (action.payload.code));
            state.educations[educationIndex]=action.payload
        },
    },
    extraReducers: (builder) => {
        //GET Educations
        builder.addCase(getEducations.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getEducations.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.educations = action.payload
                state.success = true;
            }
        });
        builder.addCase(getEducations.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //Create Educatino
        builder.addCase(createEducation.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createEducation.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.educations.push(action.payload)
                state.success = true;
            } else {
                state.success = false
            }
        });
        builder.addCase(createEducation.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //Create Delete
        builder.addCase(deleteEducation.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteEducation.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload && action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.success = false
            }
        });
        builder.addCase(deleteEducation.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //Create Update
        builder.addCase(updateEducation.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(updateEducation.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload && action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.success = false
            }
        });
        builder.addCase(updateEducation.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
    }
})

export const { deleteEducationOnList,updateEducationOnList } = educationSlice.actions;
export default educationSlice.reducer;