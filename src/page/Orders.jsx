import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
import Table from '../component/table/Table'
import Badge from '../component/badge/Badge'
import bodyListOrders from '../assets/admin/JsonData/orders-list.json'
import { getAllOrders, getOrderById } from '../slices/orderSlice'





const latestOrders = {
  header: [
    "Id đặt hàng",
    "Người mua",
    "Đơn giá",
    "Ngày",
    "Trạng thái",
    "Xem chi tiết"

  ],
  body: bodyListOrders
}
const orderStatus = {
  "Shipping": "Shipping",
  "Xử lý": "Pending",
  "pending": "Pending",
  "Cancel": "Cancel",
  "Solved": "Solved",
  "Refund": "Refund",
  "Shipped": "Shipped",
  "unpaid":"Unpaid",
  "paid":"Paid",
  "cancel": "Cancel",
  "cancel": "Cancel",
  "confirmed":"confirmed"

}

const renderOrderHead = (item, index) => (
  <th key={index}>{item} </th>
)


const Orders = () => {

  const dispatch = useDispatch()
  const [orderDetail,setOrdersDetail]=useState()
  const fetchOrderDetail = async (id) => {
    var res = null
    res=await dispatch(getOrderById(id)).unwrap();
    setOrdersDetail(res.data.data)
  }
  const history = useHistory()
  const handleClick = (id) => {
    fetchOrderDetail(id)
    localStorage.setItem('id',id)
    history.push('/orderDetail')
    console.log(id)
  }
  const renderOrderBody = (item, index) => (
    <tr key={index}  >
      <td  >{item.id}</td>
      <td >{item.orderUser.name}</td>
      <td >{item.orderdetail.totalPrice}</td>
      <td>{item.createTime}</td>
      <td >
        <Badge type={orderStatus[item.state]} content={item.state} />
      </td>
      <td>
        <Link 
         to={{
          pathname: `/orderDetail`,
          state: { orderId: item.id }
        }}
        style={
          {
            textDecoration: 'underline',
            color: "blue"
          }
        }
        >
          Xem chi tiết
        </Link>
      </td>
    </tr>
  )
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchOrders = async (selectOption) => {
      var res = null;
      res = await dispatch(getAllOrders(page)).unwrap();
      setOrders(res.data.data)
    }
    fetchOrders()

  }, [page])
  return (
    <div>
      <h2 className='page-header' >Orders</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit='10'
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={orders}
                renderBody={(item, index) => renderOrderBody(item, index)}
                onClickUp={() => setPage(page + 1)}
                onClickDown={() => setPage(page - 1)}
                page={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders