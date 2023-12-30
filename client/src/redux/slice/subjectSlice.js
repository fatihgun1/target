import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosConfig";

const initialState = {
    subjects: [],
    loading: false,
    success: false,
    error: null
}

export const createSubject = createAsyncThunk('createSubject', async (paylaod) => {
    try {
        const response = await axiosInstance.post(`/subject/create`, paylaod)
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getSubjects = createAsyncThunk('getSubjects', async (paylaod) => {
    try {
        const response = await axiosInstance.post(`/subject/all`, paylaod)
        return response.data;

    } catch (err) {
        console.log(err);
    }
})

export const updateSubject = createAsyncThunk('updateSubject', async (paylaod) => {
    try {
        const response = await axiosInstance.post(`/subject/update`, paylaod)
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const deleteSubject = createAsyncThunk('deleteSubject', async (paylaod) => {
    try {
        const response = await axiosInstance.post(`/subject/delete`, paylaod)
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        updateSubjectOnList: (state, action) => {
            let index = current(state.subjects).findIndex(item => item.code === (action.payload.code));
            state.subjects[index] = action.payload;
        },
        deleteSubjectOnList: (state, action) => {
            let index = current(state.subjects).findIndex(item => item.code === (action.payload.code));
            state.subjects.splice(index, 1)
        },
    },
    extraReducers: (builder) => {
        //Create Subjects
        builder.addCase(createSubject.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createSubject.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.subjects.push(action.payload)
                state.success = true;
            }
        });
        builder.addCase(createSubject.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //GET Subjects
        builder.addCase(getSubjects.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getSubjects.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.subjects = action.payload
                state.success = true;
            }
        });
        builder.addCase(getSubjects.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //Update Subject
        builder.addCase(updateSubject.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(updateSubject.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.success = true;
            }
        });
        builder.addCase(updateSubject.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        //Delete Subject
        builder.addCase(deleteSubject.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteSubject.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload) {
                state.success = true;
            }
        });
        builder.addCase(deleteSubject.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });

    }
})

export const { updateSubjectOnList, deleteSubjectOnList } = subjectSlice.actions;
export default subjectSlice.reducer;