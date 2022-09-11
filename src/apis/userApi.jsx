import { axiosInstance, baseURL } from './axiosClient'

const userApi = {
    getPostBySlug: (slug) => axiosInstance.get(`${baseURL.query}/post/getPostBySlug/${slug}`),
    getCurrentUser: (id) => axiosInstance.get(`${baseURL.auth}/admin/users${id}`),
    getAllUsers: (page) => axiosInstance.get(`${baseURL.auth}/admin/users?page=${page}&size=10`),
    getListCategory: () => axiosInstance.get(`${baseURL.query}/post/getListCategory`),
    getPostsByCategory: (slug) => axiosInstance.get(`${baseURL.query}/post/getPostsByCategory/${slug}`),
    getAllPostsByCategory: (slug, subSlug) => axiosInstance.get(`${baseURL.query}/post/getAllPostsByCategory/${slug}/${subSlug}`),
    disableUserId:(id)=>axiosInstance.put(`${baseURL.auth}/admin/users/disable/${id}`)
}
export default userApi