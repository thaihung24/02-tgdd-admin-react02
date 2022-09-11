import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from '../apis/orderApi'

export const getAllOrders = createAsyncThunk("order/getAllOrders", async (page, { rejectWithValue }) => {
    try {
        const response = await orderApi.getAllOrders(page);
        return response
    } catch (error) {
        return rejectWithValue(error.response)
    }

})
export const getOrderById = createAsyncThunk("order/getOrderById",async (id, { rejectWithValue }) =>{
    try {
        const response = await orderApi.getOrderById(id);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const updateStatusOrderById = createAsyncThunk("order/updateStatusOrderById",async (statusOrder,{ rejectWithValue}) =>{
    try {
        const response = await orderApi.updateStatusOrderById(statusOrder);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const confirmOrderById = createAsyncThunk("order/confirmOrderById",async (id,{ rejectWithValue}) =>{
    try {
        const response = await orderApi.confirmOrderById(id);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
const initialState = {
    detail: {},
    loading: false,
    error: null,
};
export const orderSlice = createSlice({
    name:"order",
    initialState,
    extraReducers: {
        [getAllOrders.pending]:(state)=>{
            state.loading = true;
        },
        [getAllOrders.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.error;
        },
        [getAllOrders.fulfilled]:(state,action)=>{
            state.loading = false;
        },
        [getOrderById.pending]:(state)=>{
            state.loading = true;
        },
        [getOrderById.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getOrderById.fulfilled]:(state,action)=>{
            state.loading = false;
            state.detail = action.payload.data.data;
        },
        [updateStatusOrderById.pending]:(state)=>{
            state.loading = true;
        },
        [updateStatusOrderById.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.error
            console.log('vao day roi',action.error)
        },
        [updateStatusOrderById.fulfilled]:(state,action)=>{
            state.loading = false;
            state.order = action.payload.data
        },    
        [confirmOrderById.pending]:(state)=>{
            state.loading = true;
        },
        [confirmOrderById.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.error
            console.log('vao day roi',action.error)
        },
        [confirmOrderById.fulfilled]:(state,action)=>{
            state.loading = false;
            state.order = action.payload.data
        }
    }
})
export default orderSlice.reducer