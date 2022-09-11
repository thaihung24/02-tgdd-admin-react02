import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productApi from '../apis/product'

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (params, { rejectWithValue }) => {
    try {
        const response = await productApi.getAllProducts(params);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})
export const getProductById = createAsyncThunk("product/getProductById", async (id, { rejectWithValue }) => {
    try {
        const response = await productApi.getProductById(id);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})
export const searchProduct = createAsyncThunk("product/searchProduct", async (key, { rejectWithValue }) => {
    try {
        const response = await productApi.searchProduct(key);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})
export const addProduct = createAsyncThunk("product/addProduct", async (product, { rejectWithValue }) => {
    try {
        const response = await productApi.addProduct(product);
        return response
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getALlCategory = createAsyncThunk("product/getALlCategory", async () => {
    const response = await productApi.getALlCategory();
    return response

})
export const getCategoryById = createAsyncThunk("product/getCategoryById", async (categoryId, { rejectWithValue }) => {
    try {
        const response = await productApi.getCategoryById(categoryId);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }


})
export const getAllManufacturer = createAsyncThunk("product/getAllManufacturer", async () => {

    const response = await productApi.getAllManufacturer();
    return response
})
export const getAllColor = createAsyncThunk("product/getAllColor", async () => {
    const response = await productApi.getAllColor();
    return response
})
export const getAllTechs = createAsyncThunk("product/getAllTechs", async () => {
    const response = await productApi.getAllTechs();
    return response
})
export const disableProductId=createAsyncThunk("product/disableProductId", async (id,{ rejectWithValue}) => {
    try {
        const response = await productApi.disableProductId(id);
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    products: [],
    categories: [],
    manufactures: [],
    colors: [],
    subCategories: [],
    loading: false,
    error: null,
};
export const productSlie = createSlice({
    name: "product",
    initialState,
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = true;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        },
        [getALlCategory.pending]: (state) => {
            state.loading = true
        },
        [getALlCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getALlCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
        },
        [getCategoryById.pending]: (state) => {
            state.loading = true
        },
        [getCategoryById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.loading = false;
            state.subCategories = action.payload.data.subcategories
            console.log('sub', action.payload.data.subcategories)
        },
        [getAllColor.pending]: (state) => {
            state.loading = true;
        },
        [getAllColor.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getAllColor.fulfilled]: (state, action) => {
            state.loading = false;
            state.colors = action.payload.data;
        },
        [addProduct.pending]:(state)=>{
            state.loading = true;
        },
        [addProduct.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [addProduct.fulfilled]:(state, action) => {
            state.loading = false;
        },
        [disableProductId.pending]:(state)=>{
            state.loading = true;
        },
        [disableProductId.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [disableProductId.fulfilled]:(state, action) => {
            state.loading = false;
        }
    }
})