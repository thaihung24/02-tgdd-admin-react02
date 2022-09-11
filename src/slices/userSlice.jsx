import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../apis/userApi";


export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (page) => {
    const response = await userApi.getAllUsers(page);
    return response;
});
export const disableUserId=createAsyncThunk("auth/disableUserId", async (id) => {
    const response = await userApi.disableUserId(id);
    return response; 
})
const initialState = {

    users: [],
    loading: false,
    error: null,
};
export const postSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.loading = true;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
        },
        [disableUserId.pending]: (state) => {
            state.loading = true;
        },
        [disableUserId.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [disableUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
        }
    },
});

export default postSlice.reducer;