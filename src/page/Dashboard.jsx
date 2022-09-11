import React from 'react'
import Chart from 'react-apexcharts'
import statusCard from '../assets/admin/JsonData/status-card-data.json'
import StatusCard from '../component/statusCard/StatusCard'
import { useSelector } from 'react-redux'
import Table from '../component/table/Table'
import { Link } from 'react-router-dom'
import Badge from '../component/badge/Badge'
const chartOptions = {
  series: [
    {
      name: 'Online customer',
      data: [50, 69, 79, 54, 91, 88, 84, 41, 43, 45, 78, 57]
    },
    {
      name: 'Store customer',
      data: [77, 50, 42, 81, 82, 95, 48, 70, 99, 84, 96, 82]
    }, {
      name: 'Tổng danh thu',
      data: [57, 50, 54, 99, 59, 63, 51, 89, 86, 82, 86, 46]
    }

  ],
  options: {
    color: ['#6a04c', '#2980b9', '#DC3545'],
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr ', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oc', 'Nov', 'Dec']
    },
    legend: {
      position: 'bottom'

    },
    grid: {
      show: false
    }
  }

}
const topCustomer = {
  head: [
    'user',
    'total orders',
    'total spending'
  ],
  body: [
    {
      "name": "Brittan Rois",
      "order": "500",
      "price": "$1500,22"
    },
    {
      "name": "Matthew Junifer",
      "order": "400",
      "price": "$1350,22"
    },
    {
      "name": "Finlay Baylay",
      "order": "380",
      "price": "$1250,22"
    },
    {
      "name": "Beryle Monelli",
      "order": "360",
      "price": "$1150,22"
    },
    {
      "name": "Ilario Shoppee",
      "order": "300",
      "price": "$1050,22"
    },
    {
      "name": "Guglielma Haking",
      "order": "290",
      "price": "$900,22"
    },
    // {
    //   "name":"Celle Acum",
    //   "order":"250",
    //   "price":"$850,22"
    // },
    // {
    //   "name":"Ailey Haig",
    //   "order":"200",
    //   "price":"$750,22"
    // }
  ]
}
const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
)
const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.name}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
)
const latestOrders = {
  header: [
    "order id",
    "user",
    "total price",
    "date",
    "status"
  ],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "Đang vận chuyển"
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Đã xử lý"
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Xử lý"
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Đã giao hàng"
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Trả hàng"
    }
  ]
}
const orderStatus = {
  "Đang vận chuyển": "Shipping",
  "Xử lý": "Pending",
  "Không giao hàng": "Cancel",
  "Đã xử lý": "Solved",
  "Trả hàng": "Refund",
  "Đã giao hàng": "Shipped"
}
const renderOrderHead = (item, index) => (
  <th key={index}>{item} </th>
)
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td >{item.id}</td>
    <td >{item.user}</td>
    <td >{item.price}</td>
    <td >{item.date}</td>
    <td >
      <Badge type={orderStatus[item.status]} content={item.status}/>
    </td>
  </tr>
)
const Dashboard = () => {
  const themeReducer = useSelector(state => state.theme.ThemeReducer.mode)

 
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="card full-height">
            {/* char */}
            <Chart
              options={themeReducer === 'theme-mode-dark' ? {
                ...chartOptions.options,
                theme: { mode: 'dark' }
            } : {
                ...chartOptions.options,
                theme: { mode: 'light' }
            }}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            {
              statusCard.map((item, index) => (
                <div key={index} className="col-6">
                  {/* status card here */}
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-8">
            <div className="card">
              <div className="card__header">
                <h3>Lasted Order</h3>
              </div>
              <div className="card__body">
                <Table 
                  headData={latestOrders.header}
                  renderHead={(item,index)=>renderOrderHead(item,index)}
                  bodyData={latestOrders.body}
                  renderBody={(item,index)=>renderOrderBody(item,index)}
                 />
              </div>
              <div className="card__footer">
                <Link to={"/orders"}>VIew All</Link>
              </div>
            </div>
          </div>
        <div className="col-4" 
        >
          <div className="card">
            <div className="card__header">
              <h3>Top customer</h3>
            </div>
            <div className="card__body">
              {/* table */}
              <Table
                headData={topCustomer.head}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                bodyData={topCustomer.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to={'/customers'}>View All</Link>
            </div>
          </div>
         
        </div>

      </div>
    </div>
  )
}

export default Dashboard