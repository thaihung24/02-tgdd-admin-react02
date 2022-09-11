import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllUsers, disableUserId } from '../slices/userSlice'
import { toast } from 'react-toastify'
import Table from '../component/table/Table'




const customerHeader = [
  '',
  'name',
  'email',
  'phone',
  'gender',
  'address',
  'enabled',
  'Edit'
]
const renderHead = (item, index) => (
  <th key={index}>{item}</th>
)

const Customer = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchUsers = async () => {
      var res = null;
      res = await dispatch(getAllUsers(page)).unwrap();
      setUsers(res.data.data.users)
    }
    fetchUsers()
  }, [page])
  const Disable = async (e) => {
    e.preventDefault()
    const res = await dispatch(disableUserId(e.target.value)).unwrap();
    if (res.data.status) {
      toast.success('Success')
      history.go(0)
    }
    else if (res.data.status === false) {
      toast.error('Error')
    }
    // history.go(0)
  }
  const renderBody = (item, index) => (

    <tr key={index} >
      <td >{item.id}</td>
      <td >{item.name}</td>
      <td >{item.email}</td>
      <td >{item.phone}</td>
      <td >{item.gender}</td>
      <td >{item.address}</td>
      <td>{(item.enable === true) ? "true" : "false"}</td>
      <td>
        <button value={item.id} onClick={Disable} style={
          {
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: '20px',
            textAlign: "center",
            textDecoration: "none",
            display: "inlineBlock",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            borderRadius: '12px'
          }
        }
        >{item.enable === true ? "disable" : "enable"}</button>
      </td>
    </tr>
  )
  return (
    <div>
      <p className='page-header'>Customers</p>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                headData={customerHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={users}
                renderBody={(item, index) => renderBody(item, index)}
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
export default Customer