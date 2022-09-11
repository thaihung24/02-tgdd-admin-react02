import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loading } from '../loading/Loading'
import { login } from '../../slices/authSlice'

import Modal from '../modal/modal'
import './form.css'
const Form = () => {

    const emailRef = useRef()
    const [userData, setUser] = useState({
        email: '',
        password: '',
    })
    const [open, setOpen] = useState(true)
    console.log('openNe', open)
    const history = useHistory()
    const dispatch = useDispatch()
    const{
        loading: isLoading,
        error,
        authenticated,
    } = useSelector((state) => state.auth)
    console.log(error)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setOpen(true)
        await dispatch(login(userData))
    }
    const onChange = (e) => {
        setUser({ ...userData, [e.target.name]: e.target.value })
    }
    if (authenticated) {
  
        history.push('/')
    }
    if (isLoading === true) {
        return <Loading />
    }
    return (
        <section id="subscribe_section" className="subscribe_section">
            <div className="row">
                <div className='Login' >
                    ĐĂNG NHẬP
                </div>
                <form onSubmit={handleSubmit} id='frmLogin' >

                    <div style={{ color: "red" }}></div>
                    <div className="inputGroup">
                        <input
                            ref={emailRef}
                            className="loginName"
                            id="Email"
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={userData.name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <input className="password"
                            id="Password"
                            name="password"
                            placeholder="Mật khẩu"
                            type="password"
                            onChange={onChange}
                            required
                            value={userData.password} />
                    </div>
                    <div className="inputGroup">
                        <button className="btn btn-primary btn-block btn-flat g-recaptcha" id="btnLogin" data-sitekey="6LeexzcfAAAAAOkgrzOieyjN5iuLbxye6h2XwbWI" data-callback="onSubmit">Đăng nhập</button>
                    </div>
                </form>
                 {error && (
                    <Modal
                        message={error}
                        open={open}
                        onClose={() => setOpen(false)}>
                    </Modal>
                )}
            </div>
        </section>
    )

}
export default Form