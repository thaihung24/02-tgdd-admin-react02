import React, {} from 'react'


import './table.css'


const Table = (props) => {
  // const dispatch = useDispatch()
  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     var res = null;
  //     res = await dispatch(getAllUsers()).unwrap();
  //     setUsers(res.data.data.users)
     
  //   }
  //   fetchUsers()
  // },[])
  
  // const initDataShow = props.bodyData ? props.bodyData.slice(0, Number(10)) : props.bodyData
  // const [dataShow, setDataShow] = useState(initDataShow)
  // const [index, setIndex] = useState(1)
  // let pages = 1

  // let page = Math.floor((props.bodyData.length) / 10)
  // pages = props.bodyData.length % Number(10) === 0 ? page : page + 1

  // const changPage = (i) => {
  //   setIndex(i)
  //   const start = Number(10) * (i - 1)
  //   const end = start + Number(10)
  //   setDataShow(props.bodyData.slice(start, end))
  // }
  return (
 
    <div>
      <div className="table-wrapper">
        <table>
          {
            props.headData && props.renderHead ? (
              <thead>
                <tr>
                  {
                    props.headData.map((item, index) =>
                      props.renderHead(item, index))
                  }
                </tr>
              </thead>
            ) : null
          }
          {
            props.renderBody ? (
              <tbody>
                {
                  props.bodyData.map((item, index) =>
                    props.renderBody(item, index))
                }
              </tbody>
            ) : null
          }
        </table>
      </div>
      {
         (
          <div className="table__pagination">
            <div className={`table__pagination-item `} onClick={() => props.page>1? props.onClickDown():null} >
              Lùi
            </div>
            <div className={`table__pagination-item active `} >
              {props.page}
            </div>
            <div className={`table__pagination-item `} onClick={() =>  props.onClickUp()} >
              Tiến
            </div>
          </div>
        ) 
      }
    </div>
  )
}

export default Table