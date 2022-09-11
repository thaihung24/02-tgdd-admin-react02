import { axiosInstance, baseURL } from './axiosClient'

const productApi={
    getAllProducts:(params) => axiosInstance.get(`${baseURL.auth}/product/search?page=${params.page}&size=20`),
    getProductById:(id)=> axiosInstance.get(`${baseURL.auth}/product/${id}`),
    searchProduct:(key)=>axiosInstance.get(`${baseURL.auth}/product/search?keyword=${key}&page=1&size=20`),
    getALlCategory:()=>axiosInstance.get(`${baseURL.auth}/category`),
    getCategoryById:(categoryId)=>axiosInstance.get(`${baseURL.auth}/category/${categoryId}`),
    getAllManufacturer:()=>axiosInstance.get(`${baseURL.auth}/manufacturer`),
    getAllColor:()=>axiosInstance.get(`${baseURL.auth}/color`),
    getAllTechs:()=>axiosInstance.get(`${baseURL.auth}/tech`),
    addProduct :(product)=>axiosInstance.post(`${baseURL.auth}/admin/product`,product),
    disableProductId:(id)=>axiosInstance.put(`${baseURL.auth}/product/disable/${id}`)
}
export default productApi