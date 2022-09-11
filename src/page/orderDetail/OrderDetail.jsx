import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../component/table/Table'
import orderSlice, { updateStatusOrderById } from '../../slices/orderSlice'
import "./orderDetail.css"
import { getOrderById,confirmOrderById } from '../../slices/orderSlice'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const OrderDetailHeader = [
  'Mã sản phẩm',
  'sản phẩm',
  'số lượng',
  'giá'
]

const status = [
  'Shipping',
  'Solved',
  'Refund',
  'Shipped',
  "paid"

]
const renderHead = (item, index) => (
  <th key={index}>{item}</th>
)
const renderBody = (item, index) => (
  <tr key={index}>
    <td> {item.product.id}</td>
    <td>
      <div className='topnav__right-product'>
        <div className='topnav__right-product__image'>
          {
            item.product.productImages?.map(i => (
              (i.id === item.productColor.id ? <img src={i.urlImage} alt="loading" /> : null)
            ))
          }
          <img src={item.product.productImages[0].urlImage} alt="" />
        </div>
        <div className='topnav__right-product__name'>
          {item.product.name}
        </div>
      </div>
    </td>
    <td>{item.quantity}</td>
    <td>{item.totalPrice}</td>
  </tr>)


const OrderDetail = () => {
  // const { detail } = useSelector((state) => state.order)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const orderId = location.state.orderId;
  // console.log(orderId)
  // const id = localStorage.getItem('id')

  const fetchUpdateStatusOrder = async (statusOrder) => {
    await dispatch(updateStatusOrderById(statusOrder)).unwrap();
  }
  const [statusOrder, setStatusOrder] = useState({
    id: orderId
  })
  const [orderDetail, setOrdersDetail] = useState()
  useEffect(() => {
    // alert("do day r")
    const fetchOrderDetail = async (orderId) => {
      var res = null
      res = await dispatch(getOrderById(orderId)).unwrap();
      setOrdersDetail(res.data.data)
      console.log(res.data.data)
    }
    fetchOrderDetail(orderId)
  }, [])
  // console.log(statusOrder)
  const handleChange = (e) => (
    setStatusOrder({ ...statusOrder, ['status']: e.target.value })

  )
  const onClick = () => {
    fetchUpdateStatusOrder(statusOrder)
    alert('successful')
    history.push('/orders')
  }
  const confirmHandle=async(e)=>{
    e.preventDefault();
    if(statusOrder.id){
      const res =await dispatch(confirmOrderById(statusOrder.id)).unwrap();
      if(res.data.status){
        alert("Đơn hàng đã được xác nhận");
      }else if (res.data.status === false) {
        alert("Đơn hàng  xác nhận thất bại");
      }
    }
  }

  // setStatusOrder({...statusOrder,['id']:id,['status']:orderDetail.orders.state})
  // console.log('order', orderDetail ? orderDetail.items : 'hihi')
  // setStatusOrder({
  //   id:orderDetail?orderDetail.orders:id,
  //   status:orderDetail?orderDetail.orders.state:'pending'
  // })
  return (

    <dir>
      <h2 className='page-header' >OrderDetail</h2>

      <div className="row " >
        <div className='col-6'>
          <div className="row col-">
            <div className="card">
              Tình trạng đơn hàng
            </div>
          </div>
        </div>
        {orderDetail?.orders.orderdetail.payment.name === "cod"&&orderDetail.orders.state==="pending" ? (
          <button className="glow-on-hover" type="button" onClick={confirmHandle}>
            Xác nhận đơn hàng
          </button>)
          : (
            <>
              <div className="col-3" >
                <select name="" id="" onChange={handleChange} className={` badge badge-${statusOrder.status ? (statusOrder.status) : (orderDetail ? orderDetail.orders.state : 'pending')
                  } `}  >
                  <option value="Shipping"> {orderDetail ? orderDetail.orders.state : 'pending'}</option>
                  {
                    status.map((item, index) => (
                      (orderDetail && orderDetail.orders.state !== item ? (<option key={index} value={item}> {item}</option>) : null)
                    ))
                  }
                </select>
              </div>
              <div className="col-3" >
                <button className="glow-on-hover" onClick={onClick} type="button">
                  Update
                </button>
              </div>
            </>
          )}
        {/* (<div className="col-3" >
          <select name="" id="" onChange={handleChange} className={` badge badge-${statusOrder.status ? (statusOrder.status) : (orderDetail ? orderDetail.orders.state : 'pending')
            } `}  >
            <option value="Shipping"> {orderDetail ? orderDetail.orders.state : 'pending'}</option>
            {
              status.map((item, index) => (
                (orderDetail && orderDetail.orders.state !== item ? (<option key={index} value={item}> {item}</option>) : null)
              ))
            }
          </select>
        </div>
        <div className="col-3" >
          <button className="glow-on-hover" onClick={onClick} type="button">
            Update
          </button>
        </div>) */}
      </div>
      <div className="row">
        <div className="col-">
          <div className="card">
            Danh sách sản phẩm : {orderDetail?.orders.createTime}
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Table
                headData={OrderDetailHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={orderDetail ? orderDetail.items : []}
                renderBody={(item, index) => renderBody(item, index)}
              >
              </Table>
            </div>
          </div>
        </div>

      </div>
      <div className="row">
        <div className="col-">
          <div className='card '> Thông tin khách hàng </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4> Thông tin và địa chỉ khách hàng</h4> <br />
              <ul>
                <li>
                  <span> Tên khách hàng :</span>
                  <span>{orderDetail?.orders.orderUser.name}</span>

                </li>
                <li>
                  <span> Số điện thoại:</span>
                  <span>{orderDetail?.orders.orderUser.phone}</span>
                </li>
                <li>
                  <span> Địa chỉ :</span>

                  {
                    orderDetail?.orders.orderUser.addresses.map((item) => {
                      var res = null
                      if (item.idDefault === true) {
                        res = item.address
                      }
                      return res
                    })
                  }

                </li>
                <li>
                  <span> Chú ý : </span>
                  <span></span>
                </li>
              </ul>


            </div>
          </div>
        </div>
      </div>



    </dir>

  )
}

export default OrderDetail