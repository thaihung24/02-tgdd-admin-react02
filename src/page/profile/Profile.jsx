import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser,updateUser } from '../../slices/authSlice'
import orderApi from '../../apis/orderApi'


const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const{order}=useSelector((state)=>state.order)
  console.log(order)
  const history = useHistory()
  const userUpdate={
    id:user.id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    gender:user.gender
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getCurrentUser((user.userId) || user.id)).unwrap();
    }
    fetchUsers()
  }, [])
  const handleSubmit = async (e)=> {
    const name = document.getElementById('name').innerHTML
    const address=document.getElementById('address').innerHTML
    const gender = document.getElementById('gender').innerHTML 
    userUpdate.name=name
    userUpdate.address=address
    userUpdate.gender=gender
    e.preventDefault()
    await dispatch(updateUser(userUpdate))
  }
  return (
    <>
      {/* <section class="grid_grid__u8VQv">
        <section class="grid_row__hxpC3 ">
          <section class="grid_column__HZphg  grid_column-12__GcQ+6" data-size="12">
            <section class="iconic_headerWrapper__o-50F">
              <section id="editor-cv-header" class="header_header__Dv-ZW iconic_header__sEhxi">
                <section class="iconic_pageTitle__ZFOpL">
                  <section class="title_titleWrapper__HxVI8 iconic_titleWrapper__z0lvg">
                    <h2 class="iconic_title__Ks1sm title_title__HH30I">
                      <section class="Text_wrapper__CfX8R">
                        <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" placeholder="Họ tên" role="textbox" aria-multiline="true" spellcheck="false">
                          <b>Nguyen Van A</b>
                        </section>
                      </section>
                    </h2>
                  </section>
                  <section class="jobPosition_jobPositionWrapper__-EN1o iconic_jobPositionWrapper__hExEA">
                    <h3 class="iconic_jobPosition__XxbwG jobPosition_jobPosition__-5-fq">
                      <section class="Text_wrapper__CfX8R">
                        <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" placeholder="Vị trí công việc bạn muốn ứng tuyển" role="textbox" aria-multiline="true" spellcheck="false">Fullstack developer</section>
                      </section>
                    </h3>
                  </section>
                </section>
                <section class="grid_grid__u8VQv">
                  <section class="grid_row__hxpC3 ">
                    <section class="grid_column__HZphg  grid_column-9__1q1bQ" data-size="9">
                      <section class="iconic_headingParagraph__49ldd">
                        <section class="">
                          <section class="paragraph_contentWrapper__hJrqS">
                          </section>
                        </section>
                        <section class="line_lineContainer__rLa+n iconic_lineContainer__nJ7TG">
                          <section class="line_line__AWgOd iconic_line__dlY-l">
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldField__qAzLP">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">
                                  <b>Name</b>
                                </section>
                              </section>
                            </section>
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldValue__SW0cA">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">Nguyen Van A</section>
                              </section>
                            </section>
                          </section>
                        </section>
                        <section class="line_lineContainer__rLa+n iconic_lineContainer__nJ7TG">
                          <section class="line_line__AWgOd iconic_line__dlY-l">
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldField__qAzLP">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">
                                  <b>Birth</b>
                                </section>
                              </section>
                            </section>
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldValue__SW0cA">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">01/01/2000</section>
                              </section>
                            </section>
                          </section>
                        </section>
                        <section class="line_lineContainer__rLa+n iconic_lineContainer__nJ7TG">
                          <section class="line_line__AWgOd iconic_line__dlY-l">
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldField__qAzLP">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">
                                  <b>Phone</b>
                                </section>
                              </section>
                            </section>
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldValue__SW0cA">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">+84 1234567890</section>
                              </section>
                            </section>
                          </section>
                        </section>
                        <section class="line_lineContainer__rLa+n iconic_lineContainer__nJ7TG">
                          <section class="line_line__AWgOd iconic_line__dlY-l">
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldField__qAzLP">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">
                                  <b>Email</b>
                                </section>
                              </section>
                            </section>
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldValue__SW0cA">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">nguyenvana@gmail.com</section>
                              </section>
                            </section>
                          </section>
                        </section>
                        <section class="line_lineContainer__rLa+n iconic_lineContainer__nJ7TG">
                          <section class="line_line__AWgOd iconic_line__dlY-l">
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldField__qAzLP">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">
                                  <b>Address</b>
                                </section>
                              </section>
                            </section>
                            <section class="field_fieldBase__hIJSR iconic_field__DQvlO iconic_fieldValue__SW0cA">
                              <section class="Text_wrapper__CfX8R">
                                <section class="Text_text__FLTYS" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="false">Ha Noi, Viet Nam</section>
                              </section>
                            </section>
                          </section>
                        </section>
                      </section>
                    </section>
                    <section class="grid_column__HZphg  grid_column-3__iyM-3" data-size="3">
                      <section class="photo_photoWrapper__5AIMn iconic_photoWrapper__sDLZW">
                        <section class="photo_photo__jLfK+">
                          <section class="photo_photoUploadMisc__3h9bX" role="button" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48" fill="currentColor" class="icons_icon__cqwPk photo_miscIcon__RS-ob">
                              <path d="M18 32h12V20h8L24 6 10 20h8zm-8 4h28v4H10z"></path>
                            </svg></section>
                          <img class="photo_dummy__2RGEY" src="/static/media/photo-placeholder.e2593893b6c9cb9af4db.png" alt="Ảnh hồ sơ của bạn" />
                        </section>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section> */}
      <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                    </div>
                    <div className="col-lg-6 px-xl-10">

                      <ul className="list-unstyled mb-1-9">
                        <li style={
                            {
                              paddingTop:"10px"
                            }
                          }>
                          <label  style={{ fontWeight: "bold" }} >Name: </label>
                          <span id='name' suppressContentEditableWarning={true} contentEditable="true" >{user.name}</span>
                        </li>
                        <li style={
                            {
                              paddingTop:"10px"
                            }
                          } >
                          <label style={{ fontWeight: "bold" }}>Gender: </label>
                          <span id='gender' suppressContentEditableWarning={true} contentEditable="true" >{user.gender}</span>
                        </li>
                        <li style={
                            {

                              paddingTop:"10px"
                            }
                          }>
                          <label style={{ fontWeight: "bold" }}>  Email:</label  >
                          <span > {user.email}</span>
                        </li>
                        <li className='info' style={
                            {
                              paddingTop:"10px"
                            }
                          }>
                          <span style={{ fontWeight: "bold" }} >Address:</span>
                          <span id='address' suppressContentEditableWarning={true} contentEditable="true">{user.address}</span>
                        </li>
                        <li className='info' style={
                            { 
                              paddingTop:"10px"
                            }
                          }><span style={{ fontWeight: "bold" }}>Phone:</span> {user.phone}</li>
                      </ul>
                      <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                        <li><a href="#!"><i className="ti-twitter-alt"></i></a></li>
                        <li><a href="#!"><i className="ti-facebook"></i></a></li>
                        <li><a href="#!"><i className="ti-pinterest"></i></a></li>
                        <li><a href="#!"><i className="ti-instagram"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button onClick={handleSubmit} style={
                  {
                    display: "block",
                    margin: "0",
                    padding: "0.65em 1em 1em",
                    backgroundColor: "#4eb8dd",
                    border: "none",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    boxShadow: "none",
                    width: "100%",
                    height: "40px",
                    fontSize: "14px",
                    color: "#fff",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    transition: "background-color 0.2s ease-out"
                  }
                } id="btnUpdate" data-callback="onSubmit">Update</button>
              </div>

            </div>
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div>
                <span className="section-title text-primary mb-3 mb-sm-4">About Me</span>
                <p>Edith is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                  <div className="mb-4 mb-sm-5">
                    <span className="section-title text-primary mb-3 mb-sm-4">Skill</span>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Driving range</div>
                        <div className="col-6 text-end">80%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{ height: "4px" }}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{ width: "80%" }} aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" role="progressbar"></div>
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Short Game</div>
                        <div className="col-6 text-end">90%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{ height: "4px" }}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{ width: "90%" }} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Side Bets</div>
                        <div className="col-6 text-end">50%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{ height: "4px" }}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{ width: "50%" }} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Putting</div>
                        <div className="col-6 text-end">60%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium" style={{ height: '4px' }}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={
                        {
                          width: '60%'
                        }
                      } aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                    </div>
                  </div>
                  <div>
                    <span className="section-title text-primary mb-3 mb-sm-4">Education</span>
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                    <p className="mb-1-9">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile