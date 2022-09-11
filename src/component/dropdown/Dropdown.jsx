// import { render } from '@testing-library/react'
import React, { useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { NavLink, Link, useHistory } from 'react-router-dom'
// import { logout } from '../../slices/authSlice'
import './dropdown.css'
const clickOutsideRef=(content_ref,toggle_ref)=>{
    document.addEventListener('mousedown',(e)=>{
        //user click toggle
        if(toggle_ref.current&&toggle_ref.current.contains(e.target)){
            content_ref.current.classList.toggle('active')
        }
        else{
            //user click outside toggle and content
            if(content_ref.current&&!content_ref.current.contains(e.target)){
                content_ref.current.classList.remove('active')
            }
        }
    })

}

const Dropdown = (props) => {
    // const dispatch = useDispatch()
    // const history = useHistory()
    // const HandleLogout = props.HandleLogout
    const dropdown__toggle_el = useRef(null)
    const dropdown__content_el = useRef(null)
    clickOutsideRef(dropdown__content_el,dropdown__toggle_el)
    return (
        <div className='dropdown'>
            <button ref={dropdown__toggle_el} className="dropdown__toggle">
                {
                    props.icon ? <i className={props.icon}></i> : ''
                }
                {
                    props.badge ? <span className='dropdown__toggle-badge'>{props.badge}</span> : ''
                }
                {
                    props.customToggle ? props.customToggle() : ''
                }
            </button>
            <div ref={dropdown__content_el} className='dropdown__content'>
                {
                    props.contentData && props.renderItems ? props.contentData.map((item, index) =>

                        props.renderItems(item, index)) : ''
                       
                }
                {
                    props.renderFooter ? (
                        <div className='dropdown__footer'>
                            {props.renderFooter()}
                        </div>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default Dropdown