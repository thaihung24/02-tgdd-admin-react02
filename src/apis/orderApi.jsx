import { axiosInstance, baseURL } from './axiosClient'
const orderApi={
    getAllOrders :(page)=> axiosInstance.get(`${baseURL.auth}/admin/all-order?page=${page}&size=10`),
    getOrderById:(id)=>axiosInstance.get(`${baseURL.auth}/order/${id}`),
    updateStatusOrderById:(statusOrder) =>axiosInstance.put(`${baseURL.auth}/admin/order/update-status/${statusOrder.id}?status=${statusOrder.status}`),
    confirmOrderById:(id)=>axiosInstance.put(`${baseURL.auth}/admin/cod/confirm/${id}`)

}

export default orderApi