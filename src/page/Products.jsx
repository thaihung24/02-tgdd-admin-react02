import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../slices/userSlice'
import ListtingProduct from '../component/ListtingProduct/ListtingProduct'
import ProductData from '../assets/admin/JsonData/listting-product.json'
import Addproduct from '../component/addProduct/Addproduct'
import { getAllProducts, getALlCategory } from '../slices/productSlice'
const Products = () => {
  const [toggle, setToggle] = useState(false)
  const HandleToggle = () => {
    setToggle(!toggle)
    console.log(toggle)
  }
  const [selectOption, setSelectOption] = useState({
    manufacturerId: 0,
    categoryId: 0,
    subCategoryId: 0,
    size: 20,
    page: 1
  })
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchUsers = async () => {
      var res = null;
      res = await dispatch(getAllProducts(selectOption)).unwrap();
      setProducts(res.data.data)
    }
    fetchUsers()

  }, [selectOption])
  return (
    <div>

      <Addproduct
        toggle={toggle}
        onClick={HandleToggle}
      />
      <h2 className='page-header' > {toggle === true ? "Add Product" : "List Products"}</h2>
      {
        toggle === false ? (
          <ul className="row listproduct">
            {
              products.map((item, index) => (
                <div className="col-3 listProduct" width="236px" key={index}>
                  <ListtingProduct
                    status={item.enable}
                    productId={item.id}
                    productOptionName={item.name}
                    promotion={item.promotion}
                    marketPrice={item.marketPrice}
                    price={item.price}
                    url={item.image}
                  />
                </div>

              ))
            }
        
              <button style={{
                alignItems: 'center',
                marginTop:"20px",
                height:"70px",
                backgroundColor:"#349eff"
              }} className=" col-12 card" onClick={()=>setSelectOption({...selectOption,["page"]:[Math.floor( selectOption.page)+1]})}>
                Xêm thêm
              </button>
          

          </ul>) : null
      }

    </div>
  )
}

export default Products