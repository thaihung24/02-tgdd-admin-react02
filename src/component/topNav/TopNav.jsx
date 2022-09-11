import React from 'react'

import Dropdown from '../dropdown/Dropdown'
import notifications from '../../assets/admin/JsonData/notification.json'
import user_menu from '../../assets/admin/JsonData/user_menus.json'
import { Link, useHistory } from 'react-router-dom'
import Themes from '../themes/Themes'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlice'

import './topnav.css'



const renderNotificationItem = (item, index) => (
    <div className='notification-item' key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className='topnav__right-user'>
        <div className='topnav__right-user__image'>
            <img src={user.image} alt="" />
        </div>
        <div className='topnav__right-user__name'>
            {user.display_name}
        </div>
    </div>
)

const TopNav = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const HandleLogout = () => {
        dispatch(logout.fulfilled())
        history.push('/')
    }
    const HandleLogIn = () => {
        history.push('/login')
    }
    const HandleClick = () => {
        history.push('/')
    }
    const HandleMyProfile=()=>{
        history.push('/profile')
    }
    const renderMenuUser = (item, index) => (
        <div key={index} onClick={
            (item.link === 'HandleLogout') ? HandleLogout
                : (item.link === 'HandleLogIn') ? HandleLogIn
                :(item.link==='myProfile')?HandleMyProfile:HandleClick
        }>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </div>
    )
    const current_user = {
        display_name: (user.name) ? user.name : 'UserName',
        image: (user.avatar) ? user.avatar : 'https://demoda.vn/wp-content/uploads/2022/01/anh-avatar-trang-den-cute-du-trend.jpg'
    }

    return (

        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder="search here..." />
                <i className="bx bx-search" />
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <Dropdown
                        // icon='bx bx-user'
                        customToggle={() => renderUserToggle(current_user)}
                        contentData={(user.userId||user.id) ? user_menu.Logged : user_menu.notLoggedIn}
                        renderItems={(item, index) => renderMenuUser(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/adminPage'>VIEW ALL</Link>}
                    />
                </div>
                <div className="topnav__right-item">
                    <Themes />
                </div>
            </div>

        </div>
    )
}
export default TopNav

