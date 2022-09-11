import { axiosInstance, baseURL } from "./axiosClient";


const postApi = {
    getPostBySlug: (slug) => axiosInstance.get(`${baseURL.query}/post/getPostBySlug/${slug}`),
    getLastPosts: () => axiosInstance.get(`${baseURL.query}/post/getLastPosts`),
    getAllPosts: () => axiosInstance.get(`${baseURL.query}/post/getAllPosts`),
    getListCategory: () => axiosInstance.get(`${baseURL.query}/post/getListCategory`),
    getPostsByCategory: (slug) => axiosInstance.get(`${baseURL.query}/post/getPostsByCategory/${slug}`),
    getAllPostsByCategory: (slug, subSlug) => axiosInstance.get(`${baseURL.query}/post/getAllPostsByCategory/${slug}/${subSlug}`)
};

export default postApi;