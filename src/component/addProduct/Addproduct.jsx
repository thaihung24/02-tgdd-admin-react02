import { width } from "@mui/system";
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import userApi from "../../apis/userApi";
import {
  getALlCategory,
  getCategoryById,
  getAllManufacturer,
  getAllColor,
  getAllTechs,
  addProduct,
} from "../../slices/productSlice";
import "./addproduct.css";
import Modal from "../modal/modal";
const Addproduct = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    video: "",
    categoryId: null,
    subCategoryId: null,
    manufacturerId: null,
    productOptions: [],
    images: [],
    techs: [],
  });
  const [toggle, setToggle] = useState({
    subCategoryToggle: false,
    manufacturerToggle: false,
    productOptionToggle: false,
    buttonSubmit: false,
    buttonSubmitOption: false,
    buttonSubmitColor: false,
    buttonCallBack: false,
    buttonSubmitInfo: false,
  });
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [techs, setTechs] = useState([]);
  const [info, setInfo] = useState("");
  const [error, setError] = useState({
    status: false,
    message: "",
    severity: "",
  });
  const [open, setOpen] = useState(true);

  const [manufacturers, setManufacturers] = useState([]);
  const [productOption, setProductOption] = useState({
    productOptionName: "",
    price: 0,
    promotion: 0,
    colors: [],
  });
  const [color, setColor] = useState({
    colorId: "",
    quantity: 0,
    urlImage: "",
  });
  const fetchSubCategory = async (id) => {
    var res = null;
    res = await dispatch(getCategoryById(id)).unwrap();
    setSubCategories(res.data.data.subcategories);
  };
  const fetchAddProduct = async (product) => {
    await dispatch(addProduct(product)).unwrap();
  };
  useEffect(() => {
    const fetchCategories = async () => {
      var res = null;
      res = await dispatch(getALlCategory()).unwrap();
      setCategories(res.data.data);
    };
    const fetchManufacturers = async () => {
      var res = null;
      res = await dispatch(getAllManufacturer()).unwrap();
      setManufacturers(res.data.data);
    };

    const fetchColors = async () => {
      var res = null;
      res = await dispatch(getAllColor()).unwrap();
      setColors(res.data.data);
    };
    const fetchGetTechs = async () => {
      var res = null;
      res = await dispatch(getAllTechs()).unwrap();
      setTechs(res.data.data);
    };
    fetchCategories();
    fetchManufacturers();
    fetchColors();
    fetchGetTechs();
  }, []);
  useEffect(() => {
    setToggle({
      ...toggle,
      ["manufacturerToggle"]: false,
      ["subCategoryToggle"]: false,
      ["productOptionToggle"]: false,
      ["buttonSubmit"]: false,
      ["buttonSubmitOption"]: false,
      ["buttonSubmitColor"]: false,
      ["buttonCallBack"]: false,
      ["buttonSubmitInfo"]: false,
    });
  }, [props.toggle]);

  // setProduct({...product,['techs']:listTech})

  // const handleChange = (event) => {
  //     (event.target.value === 'ChooseCategory') ?
  //         (
  //             setToggle({ ...toggle, ['manufacturerToggle']: false, ['subCategoryToggle']: false, ['productOptionToggle']: false })
  //         ) :
  //         (event.target.name === 'categoryId') ?
  //             (
  //                 fetchSubCategory(event.target.value) &&
  //                 setToggle({ ...toggle, ['subCategoryToggle']: true }) &&
  //                 setCategoryId(event.target.value) &&
  //                 setProduct({ ...product, [event.target.name]: event.target.value })
  //             ) :
  //             (event.target.value === 'ChooseSubcategory') ?
  //                 (
  //                     (setToggle({ ...toggle, ['manufacturerToggle']: false, ['productOptionToggle']: false }))
  //                 ) :
  //                 (event.target.name === 'subCategoryId') ?
  //                     (
  //                         setProduct({ ...product, [event.target.name]: event.target.value }) ||
  //                         setToggle({ ...toggle, ['manufacturerToggle']: true })
  //                     ) :
  //                     (event.target.value === 'ChooseManufacturer') ?
  //                         (
  //                             setToggle({ ...toggle, ['productOptionToggle']: false })
  //                         ) :
  //                         (
  //                             setToggle({ ...toggle, ['productOptionToggle']: true }) &&
  //                             setProduct({ ...product, [event.target.name]: event.target.value })
  //                         )
  // }

  const handleChangeCategory = (event) => {
    if (event.target.value === "ChooseCategory") {
      setToggle({
        ...toggle,
        ["manufacturerToggle"]: false,
        ["subCategoryToggle"]: false,
        ["productOptionToggle"]: false,
        ["buttonSubmit"]: false,
        ["buttonSubmitOption"]: false,
        ["buttonSubmitColor"]: false,
        ["buttonCallBack"]: false,
        ["buttonSubmitInfo"]: false,
      });
    } else {
      setToggle({ ...toggle, ["subCategoryToggle"]: true });
      setCategoryId(event.target.value);
      fetchSubCategory(event.target.value);
      setProduct({ ...product, [event.target.name]: event.target.value });
    }
  };
  console.log("toggle", toggle);
  const handleChangeSubCategory = (event) => {
    if (event.target.value === "ChooseSubcategory") {
      setToggle({
        ...toggle,
        ["manufacturerToggle"]: false,
        ["productOptionToggle"]: false,
        ["buttonSubmit"]: false,
        ["buttonSubmitOption"]: false,
        ["buttonSubmitColor"]: false,
        ["buttonCallBack"]: false,
        ["buttonSubmitInfo"]: false,
      });
    } else {
      setProduct({ ...product, [event.target.name]: event.target.value });
      setToggle({ ...toggle, ["manufacturerToggle"]: true });
    }
  };
  const handleChangeManufacturer = (event) => {
    if (event.target.value === "ChooseManufacturer") {
      setToggle({
        ...toggle,
        ["productOptionToggle"]: false,
        ["buttonSubmit"]: false,
        ["buttonSubmitOption"]: false,
        ["buttonSubmitColor"]: false,
        ["buttonCallBack"]: false,
        ["buttonSubmitInfo"]: false,
      });
    } else {
      setToggle({ ...toggle, ["buttonSubmit"]: true });
      setProduct({ ...product, [event.target.name]: event.target.value });
    }
  };

  const listTech = [];
  techs.map((item, index) => {
    listTech.push({
      techId: item.id,
      info: "",
    });
  });

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onChangeProductOption = (e) => {
    setProductOption({ ...productOption, [e.target.name]: e.target.value });
    setToggle({ ...toggle, ["buttonSubmitOption"]: true });
  };
  const onChangeColor = (e) => {
    if (e.target.value === "ChooseColor") {
      setError({
        ...error,
        ["status"]: true,
        ["message"]: "Vui Lòng chọn mã màu kìa cha",
        ["severity"]: "error",
      });
      setOpen(true);
    } else {
      setColor({ ...color, [e.target.name]: e.target.value });
    }
  };

  const checkMaMau = (colors, colorId) => {
    var res = false;
    colors.map((item) => {
      if (item.colorId === colorId) {
        res = true;
      }
    });
    return res;
  };
  const onClick = (e) => {
    if (e.target.value === "frmStep1") {
      if (product.name === "" || product.description === "") {
        setError({
          ...error,
          ["status"]: true,
          ["message"]: "Ê Ê hong có để trống nghen",
          ["severity"]: "error",
        });
        setOpen(true);
      } else {
        setToggle({
          ...toggle,
          ["productOptionToggle"]: true,
          ["buttonSubmit"]: false,
        });
      }
    } else if (e.target.value === "frmStep2") {
      if (
        productOption.productOptionName === "" ||
        productOption.price <= 0 ||
        productOption.promotion < 0 ||
        productOption.promotion > 100
      ) {
        setError({
          ...error,
          ["status"]: true,
          ["message"]: "Hong có để trống, giá > 0 , 0 <= khuyến mãi<100  ",
          ["severity"]: "error",
        });
        setOpen(true);
      } else {
        setToggle({
          ...toggle,
          ["productOptionToggle"]: false,
          ["buttonSubmitColor"]: true,
        });
      }
    } else if (e.target.value === "frmStep3") {
      if (color.quantity <= 0 || color.urlImage === "") {
        setError({
          ...error,
          ["status"]: true,
          ["message"]: "Hong có để trống, số lượng >0",
          ["severity"]: "error",
        });
        setOpen(true);
      } else if (checkMaMau(productOption.colors, color.colorId) === true) {
        setError({
          ...error,
          ["status"]: true,
          ["message"]: "Mã màu này có rồi bé ơi",
          ["severity"]: "error",
        });
        setOpen(true);
      } else {
        productOption.colors.push({
          colorId: color.colorId,
          quantity: color.quantity,
        });
        product.images.push({
          urlImage: color.urlImage,
          colorId: color.colorId,
        });
        setError({
          ...error,
          ["status"]: true,
          ["message"]: "Đã thêm mã màu này vào Option",
          ["severity"]: "success",
        });
        setOpen(true);
        setToggle({
          ...toggle,
          ["buttonCallBack"]: true,
          ["buttonSubmitColor"]: true,
        });
      }
    } else if (e.target.value === "callBack") {
      product.productOptions.push(productOption);
      setProductOption({
        productOptionName: "",
        price: 0,
        promotion: 0,
        colors: [],
      });
      setToggle({
        ...toggle,
        ["productOptionToggle"]: true,
        ["buttonSubmitColor"]: false,
        ["buttonCallBack"]: false,
        ["buttonSubmitInfo"]: false,
      });
    } else if (e.target.value === "next") {
      product.productOptions.push(productOption);
      setProductOption({
        productOptionName: "",
        price: 0,
        promotion: 0,
        colors: [],
      });
      setToggle({
        ...toggle,
        ["buttonSubmitInfo"]: true,
        ["buttonSubmitColor"]: false,
        ["buttonCallBack"]: false,
      });
    } else if (e.target.value === "Add") {
      techs.map((item) =>
        product.techs.push({
          techId: item.id,
          info: document.getElementById(item.id).innerHTML,
        })
      );
      fetchAddProduct(product);
      setError({
        ...error,
        ["status"]: true,
        ["message"]: "Thêm sản phẩm thành công",
        ["severity"]: "success",
      });
      setOpen(true);
      history.push("/");
    }
  };
  const productOptionSubmit = () => {
    console.log("hihi");
  };
  return (
    <div>
      <button className="glow-on-hover" onClick={props.onClick} type="button">
        {props.toggle === false ? "ADD PRODUCT" : "CLOSE"}{" "}
      </button>
      {props.toggle === true ? (
        <>
          {toggle.productOptionToggle !== true &&
          toggle.buttonSubmitColor !== true &&
          toggle.buttonSubmitInfo !== true ? (
            <>
              <form name="frmStep1">
                <div className="inputGroup">
                  <label htmlFor="Name">Name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="name"
                    type="text"
                    value={product.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    placeholder="description"
                    type="text"
                    value={product.description}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="video">Video</label>
                  <input
                    id="video"
                    name="video"
                    placeholder="video"
                    type="text"
                    value={product.video}
                    onChange={onChange}
                    required
                  />
                </div>
                <label htmlFor="category">Choose category:</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  onChange={handleChangeCategory}
                  required
                >
                  <option value="ChooseCategory">Choose category</option>
                  {categories.map((item, index) => (
                    <option key={index} name="categoryId" value={item.id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
                <br />
                {toggle.subCategoryToggle === true ? (
                  <>
                    <label htmlFor="subcategories">Choose subcategory:</label>
                    <select
                      name="subCategoryId"
                      id="subCategoryId"
                      required
                      onChange={handleChangeSubCategory}
                    >
                      <option value="ChooseSubcategory">
                        {" "}
                        Choose subCategory
                      </option>
                      {subcategories.map((item, index) => (
                        <option
                          key={index}
                          name="subCategoryId"
                          value={item.id}
                        >
                          {item.categoryName}
                        </option>
                      ))}
                    </select>
                    <br />
                  </>
                ) : (
                  ""
                )}
                {toggle.manufacturerToggle === true ? (
                  <>
                    <label htmlFor="manufacturer"> Choose manufacturer:</label>
                    <select
                      name="manufacturerId"
                      id="manufacturerId"
                      required
                      onChange={handleChangeManufacturer}
                    >
                      <option value="ChooseManufacturer">
                        Choose manufacturer
                      </option>
                      {manufacturers.map((item, index) => (
                        <option
                          key={index}
                          value={item.id}
                          name="manufacturerId"
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </>
                ) : null}
                {toggle.buttonSubmit ? (
                  <button
                    style={{
                      display: "block",
                      marginTop: "1rem",
                      padding: "0.65em 1em 1em",
                      backgroundColor: "#4eb8dd",
                      border: "none",
                      borderRadius: "4px",
                      boxSizing: "borderBox",
                      boxShadow: "none",
                      width: "100%",
                      maxWidth: "400px",
                      height: "40px",
                      fontSize: "14px",
                      color: "#fff",
                      fontWeight: "600",
                      fontFamily: "inherit",
                    }}
                    type="frmStep1"
                    value="frmStep1"
                    onClick={onClick}
                  >
                    Lưu thông tin sản phẩm
                  </button>
                ) : null}
              </form>
            </>
          ) : null}

          {toggle.productOptionToggle ? (
            <form>
              <div className="inputGroup">
                <label htmlFor="productOptionName">Product Option:</label>
                <input
                  className="productOptionName"
                  id="productOptionName"
                  name="productOptionName"
                  placeholder="12G"
                  type="text"
                  onChange={onChangeProductOption}
                  required
                  value={productOption.productOptionName}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="price">Giá</label>
                <input
                  className="price"
                  id="price"
                  name="price"
                  placeholder="price"
                  type="text"
                  onChange={onChangeProductOption}
                  required
                  value={productOption.price}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="promotion">Phần trăm khuyến mãi:</label>
                <input
                  className="promotion"
                  id="promotion"
                  name="promotion"
                  placeholder="promotion"
                  type="text"
                  onChange={onChangeProductOption}
                  required
                  value={productOption.promotion}
                />
              </div>
              {toggle.productOptionToggle ? (
                <button
                  style={{
                    display: "block",
                    marginTop: "1rem",
                    padding: "0.65em 1em 1em",
                    backgroundColor: "#4eb8dd",
                    border: "none",
                    borderRadius: "4px",
                    boxSizing: "borderBox",
                    boxShadow: "none",
                    width: "100%",
                    maxWidth: "400px",
                    height: "40px",
                    fontSize: "14px",
                    color: "#fff",
                    fontWeight: "600",
                    fontFamily: "inherit",
                  }}
                  type="frmStep2"
                  value="frmStep2"
                  onClick={onClick}
                >
                  {" "}
                  Thêm Product Option{" "}
                </button>
              ) : null}
            </form>
          ) : null}

          {toggle.buttonSubmitColor ? (
            <form>
              {productOption.colors.length > 0 ? (
                <span> Bạn đã thêm {productOption.colors.length} màu </span>
              ) : null}
              <br />
              <label htmlFor="colorId"> Thêm màu cho từng Option :</label>
              <select name="colorId" id="colorId" onChange={onChangeColor}>
                <option name="ChooseColor" value="ChooseColor">
                  {" "}
                  Choose Color
                </option>
                {colors.map((item, index) => (
                  <option key={index} name="colorId" value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="inputGroup ">
                <label htmlFor="quantity">quantity:</label>
                <input
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                  type="text"
                  value={color.quantity}
                  onChange={onChangeColor}
                  required
                />
              </div>
              <div className="inputGroup ">
                <label htmlFor="link">Link ảnh cho mã màu này:</label>
                <input
                  id="urlImage"
                  name="urlImage"
                  placeholder="https://hungngubovcl.com"
                  type="text"
                  value={color.urlImage}
                  onChange={onChangeColor}
                  required
                />
              </div>
            </form>
          ) : null}
          {toggle.buttonSubmitColor ? (
            <button
              style={{
                display: "block",
                position: "absolute",
                left: "56%",
                top: "67%",
                padding: "0.65em 1em 1em",
                backgroundColor: "#4eb8dd",
                border: "none",
                borderRadius: "4px",
                boxSizing: "borderBox",
                boxShadow: "none",
                width: "30%",
                maxWidth: "130px",
                height: "40px",
                fontSize: "14px",
                color: "#fff",
                fontWeight: "600",
                fontFamily: "inherit",
              }}
              type="frmStep3"
              value="frmStep3"
              onClick={onClick}
            >
              {" "}
              Thêm màu này{" "}
            </button>
          ) : null}
          {toggle.buttonCallBack ? (
            <>
              <button
                style={{
                  display: "block",
                  position: "absolute",
                  left: "46%",
                  top: "67%",
                  padding: "0.5em 0.3em 0.3em",
                  backgroundColor: "#4eb8dd",
                  border: "none",
                  borderRadius: "4px",
                  boxSizing: "borderBox",
                  boxShadow: "none",
                  width: "30%",
                  maxWidth: "130px",
                  height: "40px",
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "600",
                  fontFamily: "inherit",
                }}
                type="frmStep3"
                value="callBack"
                onClick={onClick}
              >
                Thêm Option Khác{" "}
              </button>
              <button
                style={{
                  display: "block",
                  position: "absolute",
                  left: "66%",
                  top: "67%",
                  padding: "0.5em 0.3em 0.3em",
                  backgroundColor: "#4eb8dd",
                  border: "none",
                  borderRadius: "4px",
                  boxSizing: "borderBox",
                  boxShadow: "none",
                  width: "30%",
                  maxWidth: "130px",
                  height: "40px",
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "600",
                  fontFamily: "inherit",
                }}
                type="frmStep3"
                value="next"
                onClick={onClick}
              >
                {" "}
                Hoàn tất thêm màu cho option{" "}
              </button>
            </>
          ) : null}
          {toggle.buttonSubmitInfo ? (
            <form action="">
              {techs.map((item, index) => (
                <li key={index}>
                  <label
                    htmlFor={item.id}
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}:{" "}
                  </label>
                  <span
                    id={item.id}
                    suppressContentEditableWarning={true}
                    contentEditable="true"
                  >
                    edit
                  </span>
                </li>
              ))}
              {toggle.buttonSubmitInfo ? (
                <button
                  style={{
                    display: "block",
                    marginTop: "1rem",
                    padding: "0.5em 0.3em 0.3em",
                    backgroundColor: "#4eb8dd",
                    border: "none",
                    borderRadius: "4px",
                    boxSizing: "borderBox",
                    boxShadow: "none",
                    width: "100%",
                    maxWidth: "400px",
                    height: "40px",
                    fontSize: "14px",
                    color: "#fff",
                    fontWeight: "600",
                    fontFamily: "inherit",
                  }}
                  type="frmStep3"
                  value="Add"
                  onClick={onClick}
                >
                  {" "}
                  Thêm sản phẩm{" "}
                </button>
              ) : null}
            </form>
          ) : null}

          {error.status ? (
            <Modal
              message={error.message}
              severity={error.severity}
              open={open}
              onClose={() => setOpen(false)}
            ></Modal>
          ) : null}
        </>
      ) : //   {/* {
      //         toggle.productOptionToggle
      //             ?
      //             (
      //                 < >
      //                     <form onSubmit={productOptionSubmit} style={
      //                         {
      //                             left: "150%"
      //                         }
      //                     }>
      //                         <div className="inputGroup " >
      //                             <label htmlFor="productOptionName">Product Option:</label>
      //                             <input
      //                                 id="productOptionName"
      //                                 name="productOptionName"
      //                                 placeholder="64G"
      //                                 type="text"
      //                                 value={productOption.productOptionName}
      //                                 onChange={onChangeProductOption}
      //                                 required
      //                             />
      //                         </div>

      //                         <form action="" style={{
      //                             left: '125%',
      //                             width: "50%"
      //                         }}>
      //                             <label htmlFor="colorId"> Thêm màu cho từng Option :</label>

      //                             <select name="colorId" id="colorId" onChange={onChangeColor} >
      //                                 <option name='ChooseColor'> Choose Color</option>
      //                                 {
      //                                     colors.map((item, index) => (
      //                                         <option key={index} name='colorId' value={item.id}>{item.name}</option>
      //                                     ))
      //                                 }
      //                             </select>
      //                             <div className="inputGroup ">
      //                                 <label htmlFor="quantity">quantity:</label>
      //                                 <input
      //                                     id="quantity"
      //                                     name="quantity"
      //                                     placeholder="quantity"
      //                                     type="text"
      //                                     value={color.quantity}
      //                                     onChange={onChangeColor}
      //                                     required
      //                                 />
      //                             </div>
      //                         </form>
      //                         {toggle.buttonSubmitOption ? (<button type="submit"  >Thêm Product Option này</button>) : null}
      //                     </form>
      //                 </>
      //             ) : null

      //     } */}

      null}
    </div>
  );
};

export default Addproduct;
