import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postApi from '../apis/postApi'
export const getLastPosts = createAsyncThunk("post/getLastPosts", async () => {
    const response = await postApi.getLastPosts();
    return response;
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
    const response = await postApi.getAllPosts();
    return response;
});

export const getListCategory = createAsyncThunk("post/getListCategory", async () => {
    const response = await postApi.getListCategory();
    return response;
});

export const getPostsByCategory = createAsyncThunk("post/getPostsByCategory", async (slug) => {
    const response = await postApi.getPostsByCategory(slug);
    return response;
});

export const getAllPostsByCategory = createAsyncThunk("post/getAllPostsByCategory", async (params) => {
    const response = await postApi.getAllPostsByCategory(params.slug, params.subSlug);
    return response;
});

export const getPostBySlug = createAsyncThunk("post/getPostBySlug", async (slug) => {
    const response = await postApi.getPostBySlug(slug);
    return response;
});

const initialState = {
    categories: [],
    lastPosts: [],
    posts: [],
    loading: false,
    error: null,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: {
        [getLastPosts.pending]: (state) => {
            state.loading = true;
        },
        [getLastPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getLastPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.lastPosts = action.payload.data.posts;
        },
        [getListCategory.pending]: (state) => {
            state.loading = true;
        },
        [getListCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getListCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
        },
        [getAllPosts.pending]: (state) => {
            state.loading = true;
        },
        [getAllPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.data.posts;
        },
        [getPostBySlug.pending]: (state) => {
            state.loading = true;
        },
        [getPostBySlug.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getPostBySlug.fulfilled]: (state, action) => {
            state.loading = false;
        },
    },
});

export default postSlice.reducer