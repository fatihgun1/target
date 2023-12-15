import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    containers: [{
        code: null, name: null, isPublished:null,
        status: [{ code: null, name: null, score: null }],
        badges: [{ code: null, name: null, description: null, score: null, mediaUrl: null, isDeserved: null }]
    }],
    loading: false,
    success: false,
    error: null
}

const user = JSON.parse(localStorage.getItem('user'));

const headers = {
    headers: {
        'Authorization': `Bearer ${user ? user.token : null}`
    }
};

export const getBackPack = createAsyncThunk('getBackPack', async () => {
    try {
        const response = await axios.get(`http://localhost:8080/pack/${user.user}`, null, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

//*********************CONTAINER*****************************
export const createContainer = createAsyncThunk('createContainer', async (payload) => {
    payload.owner = user.user;
    try {
        const response = await axios.post(`http://localhost:8080/container/create`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const getContainer = createAsyncThunk('getContainer', async (payload) => {
    try {
        const response = await axios.get(`http://localhost:8080/container/${payload.code}`, null, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const updateContainer = createAsyncThunk('updateContainer', async (payload) => {
    try {
        const response = await axios.post(`http://localhost:8080/container/update`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const deleteContainer = createAsyncThunk('deleteContainer', async (payload) => {
    try {
        const response = await axios.post(`http://localhost:8080/container/delete`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})

export const replaceContainer = createAsyncThunk('replaceContainer', async (payload) => {
    try {
        const response = await axios.post(`http://localhost:8080/container/replace`, payload, headers)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
})


export const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {
        setBadgeToContainer: (state, action) => {
            if (action.payload) {
                let index = current(state.containers).findIndex(item => item.code === (action.payload.container))
                state.containers.at(index).badges.push(action.payload)
            }
        },
        deleteBadgeOnContainer: (state, action) => {
            let containerIndex = current(state.containers).findIndex(item => item.code === (action.payload.container));
            let badgeIndex = state.containers.at(containerIndex).badges.findIndex(item => item.code === action.payload.code);
            state.containers.at(containerIndex).badges.splice(badgeIndex, 1)
        },
        setStatusToContainer: (state, action) => {
            if (action.payload) {
                let index = current(state.containers).findIndex(item => item.code === (action.payload.container))
                state.containers.at(index).status.push(action.payload)
            }
        },

        deleteStatusOnContainer: (state, action) => {
            let containerIndex = current(state.containers).findIndex(item => item.code === (action.payload.container));
            let badgeIndex = state.containers.at(containerIndex).status.findIndex(item => item.code === action.payload.code);
            state.containers.at(containerIndex).status.splice(badgeIndex, 1)
        },

        disablePublishButton: (state, action) => {
            let containerIndex = current(state.containers).findIndex(item => item.code === (action.payload.code));
            state.containers.at(containerIndex).isPublished = false;
        },

    },
    extraReducers: (builder) => {
        //get pack
        builder.addCase(getBackPack.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getBackPack.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status === "BAD_REQUEST") {
                state.error = action.payload.message;
                state.success = false;
            }
            if (action.payload.containers) {
                state.success = true;
                state.containers = action.payload.containers;
            }
        });
        builder.addCase(getBackPack.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // crate contaienr
        builder.addCase(createContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(createContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
                state.containers.push(action.payload);
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(createContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // get contaienr
        builder.addCase(getContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(getContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            console.log(action.payload);
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
                state.containers.push(action.payload);
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(getContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });

        // update contaienr
        builder.addCase(updateContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(updateContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(updateContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // delete contaienr
        builder.addCase(deleteContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(deleteContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
                let containerIndex = current(state.containers).findIndex(item => item.code === (action.payload.container));
                state.containers.splice(containerIndex, 1)
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(deleteContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });
        // replace container
        builder.addCase(replaceContainer.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false
        });
        builder.addCase(replaceContainer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            if (action.payload.status !== "BAD_REQUEST") {
                state.success = true;
            } else {
                state.error = action.payload.message;
                state.success = false;
            }
        });
        builder.addCase(replaceContainer.rejected, (state, action) => {
            state.loading = false;
            state.error = "3";
            state.success = false
        });

    }
})

export const { setBadgeToContainer, deleteBadgeOnContainer, setStatusToContainer, deleteStatusOnContainer,disablePublishButton } = packSlice.actions
export default packSlice.reducer;