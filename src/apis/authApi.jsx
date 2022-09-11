import { axiosInstance, baseURL } from './axiosClient'

const authApi = {
  getCurrentUser: (id) =>
    axiosInstance.get(`${baseURL.auth}/admin/users/${id}`),
  login: (user) => axiosInstance.post(`${baseURL.auth}/login`, user),
  loginByGoogle: (token) =>
    axiosInstance.post(`${baseURL.auth}/auth/google`, token),
  register: (user) => axiosInstance.post(`${baseURL.user}/user/signUp`, user),
  registerAdmin: (user) =>
    axiosInstance.post(`${baseURL.user}/user/signUpForAdmin`, user),
  forgotPassword: (email) =>
    axiosInstance.post(`${baseURL.user}/user/forgotPassword`, email),
  resetPassword: (password, token) =>
    axiosInstance.post(`${baseURL.user}/user/resetPassword/${token}`, password),
  uploadAvatar: (formData) =>
    axiosInstance.post(`${baseURL.user}/user/uploadAvatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  updateUser: (user) =>
    axiosInstance.put(`${baseURL.auth}/user`, user),
  disableUser:(userId)=>
    axiosInstance.put(`${baseURL.auth}/admin/users/disable/${userId}`),
  logout: () => axiosInstance.delete(`${baseURL.auth}/logout`),
}

export default authApi
