import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../apis/authApi'
export const getCurrentUser = createAsyncThunk(
    'auth/currentUser',
    async (params, { rejectWithValue }) => {
      try {
        const res = await authApi.getCurrentUser(params)
        const currentUser = res.data
        return currentUser
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  export const login = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
      try {
        const response = await authApi.login(user)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  
  export const loginByGoogle = createAsyncThunk(
    'auth/loginByGoogle',
    async (token, { rejectWithValue }) => {
      try {
        const response = await authApi.loginByGoogle(token)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )

  export const register = createAsyncThunk(
    'auth/register',
    async (user, { rejectWithValue }) => {
      try {
        await authApi.register(user)
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  export const registerAdmin = createAsyncThunk(
    'auth/registerAdmin',
    async (user, { rejectWithValue }) => {
      try {
        const response = await authApi.registerAdmin(user)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  
  export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (user, { rejectWithValue }) => {
      try {
        const response = await authApi.forgotPassword(user)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  
  export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data, { rejectWithValue }) => {
      try {
        const response = await authApi.resetPassword(data.password, data.token)
  
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (file, { rejectWithValue }) => {
      try {
        const formData = new FormData()
        formData.append('avatar', file)
        const response = await authApi.uploadAvatar(formData)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  
  export const logout = createAsyncThunk(
    'auth/logout',
    async (params, { rejectWithValue }) => {
      try {
        const response = await authApi.logout()
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (user, { rejectWithValue }) => {
      try {
        const response = await authApi.updateUser(user)
        return response
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  
  const initialState = {
    loading: false,
    authenticated: false,
    user: {},
    error: null,
  }
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        window.localStorage.accessToken = ''
        window.localStorage.refreshToken = ''
        state.authenticated = false
        state.user = {}
      },
      closeError: (state) => {
        state.error = null
      },
    },
    extraReducers: {
      [getCurrentUser.pending]: (state) => {
        state.loading = true
      },
      [getCurrentUser.rejected]: (state, action) => {
        state.loading = false
      },
      [getCurrentUser.fulfilled]: (state, action) => {
        state.loading = false
        state.user = action.payload.data
        state.authenticated = true
      },
      [login.pending]: (state) => {
        state.loading = true
      },
      [login.rejected]: (state, action) => {
        state.loading = false
        state.authenticated = false
        state.error = action.payload.message
       
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false
        state.authenticated = true
        state.user = action.payload.data.data
        console.log(action.payload.data.data)
        // console.log(state.user)
        // console.log(action.payload.data)
        // console.log(state.user)
        localStorage.setItem('accessToken', action.payload.data.data.access_token)
        // localStorage.setItem('refreshToken', action.payload.data.refresh_token)
      
      },
      [loginByGoogle.pending]: (state) => {
        state.loading = true
      },
      [loginByGoogle.rejected]: (state, action) => {
        state.loading = false
        state.authenticated = false
        state.error = action.payload.msg
      },
      [loginByGoogle.fulfilled]: (state, action) => {
        state.loading = false
        state.authenticated = true
        state.user = action.payload.data.user
        
        localStorage.setItem('accessToken', action.payload.data.access_token)
        localStorage.setItem('refreshToken', action.payload.data.refresh_token)
      },
      [register.pending]: (state) => {
        state.loading = true
      },
      [register.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.msg
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false
        state.error = null
      },
      [registerAdmin.pending]: (state) => {
        state.loading = true
      },
      [registerAdmin.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.msg
      },
      [registerAdmin.fulfilled]: (state, action) => {
        state.loading = false
        state.error = null
      },
      [forgotPassword.pending]: (state) => {
        state.loading = true
      },
      [forgotPassword.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.msg
      },
      [forgotPassword.fulfilled]: (state, action) => {
        state.loading = false
      },
      [resetPassword.pending]: (state) => {
        state.loading = true
      },
      [resetPassword.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.msg
      },
      [resetPassword.fulfilled]: (state, action) => {
        state.loading = false
      },
      [uploadAvatar.pending]: (state) => {
        state.loading = true
      },
      [uploadAvatar.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.msg
      },
      [uploadAvatar.fulfilled]: (state, action) => {
        state.loading = false
        state.user.avatar = action.payload.data.avatar
      },
      [logout.pending]: (state) => {
        state.loading = true
      },
      [logout.rejected]: (state, action) => {
        state.error = action.payload.msg
      },
      [logout.fulfilled]: (state, action) => {
        state.loading = false
        state.authenticated = false
        state.user = {}
        state.error=''
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      },
      [updateUser.pending]: (state) => {
        state.loading = true
      },
      [updateUser.rejected]: (state, action) => {
        state.loading = false
        state.authenticated = false
        state.error = action.payload.message
       
      },
      [updateUser.fulfilled]: (state, action) => {
        state.loading = false
        state.authenticated = true
        state.user = action.payload.data.data
        // console.log(state.user)
        // console.log(action.payload.data)
        // console.log(state.user)
        // localStorage.setItem('accessToken', action.payload.data.data.access_token)
        // localStorage.setItem('refreshToken', action.payload.data.refresh_token)
      
      },
    },
  })
  export default authSlice.reducer
  export const authAction = authSlice.actions
  