import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import "./listingProduct.css";
import { disableProductId } from "../../slices/productSlice";


const ListtingProduct = (props) => {
  const history= useHistory()
  const dispatch = useDispatch()
  const onClickHandle = async(e)=>{
    e.preventDefault()
    if(props.productId){
      const res = await dispatch(disableProductId(props.productId)).unwrap();
      if(res.data.status){
        alert("successfully");
        history.go(0)
      }else if (res.data.status === false) {
        alert("Error");
      }
    }
  }
  const themeReducer = useSelector((state) => state.theme.ThemeReducer.mode);
  return (
    <div  >
      <button className="btnDisable" style={{
        backgroundColor:(props.status?"#FF002E":"#28A745")
      }} onClick={onClickHandle}>{props.status?"Disable":"Enable"}</button>
      <div className="item-label">

        <span color={themeReducer === "theme-mode-dark" ? "white" : "black"}>
          Trả góp 0%
        </span>
      </div>
      <div className="item-img">
        <img width="210px" src={props.url} alt={props.productOptionName}></img>
      </div>
      <div className="result-label temp3">
        <img
          width="20"
          height="20"
          class=" lazyloaded"
          alt="ƯU ĐÃI SINH NHẬT"
          data-src="https://cdn.tgdd.vn/2022/07/content/50x50-50x50-12.png"
          src="https://cdn.tgdd.vn/2022/07/content/50x50-50x50-12.png"
        />
        <span>ƯU ĐÃI SINH NHẬT</span>
      </div>
      <h3>{props.productOptionName}</h3>
      <div className="item-compare">
        <span
          style={{
            color: themeReducer === "theme-mode-dark" ? "white" : "black",
          }}
        >
          5.4"
        </span>
        <span
          style={{
            color: themeReducer === "theme-mode-dark" ? "white" : "black",
          }}
        >
          Super Retina XDR
        </span>
      </div>
      <div className="box-p">
        <div
          className="price-old back"
          style={{
            color: themeReducer === "theme-mode-dark" ? "white" : "black",
          }}
        >
          {props.price}₫
        </div>
        <div
          className="percent"
          style={{
            color: themeReducer === "theme-mode-dark" ? "white" : "black",
          }}
        >
          -{props.promotion}%
        </div>
      </div>
      <strong
        className="price"
        style={{
          color: themeReducer === "theme-mode-dark" ? "white" : "black",
        }}
      >
        {props.marketPrice}₫
      </strong>
      <div className="item-rating"></div>
    </div>
  );
};
export default ListtingProduct;
