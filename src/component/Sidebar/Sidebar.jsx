import React from 'react'
import {BallTriangle} from "react-loader-spinner";
import './sidebar.css'
import { Link } from "react-router-dom";
// import logo from '../../assets/image/logo192.png'
import sidebar_item from '../../assets/admin/JsonData/sidebar_routes.json'
const SidebarItem = props => {
    const active = props.active ? 'active' : ''
    return (
        <div className='sidebar_item'>
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>
        </div>
    )
}
const Sidebar = (props) => {
    const activeItem = sidebar_item.findIndex(item => item.route === props.location.pathname)
    return (
        <div className='sidebar'>
            <div className='sidebar_logo'>
            <BallTriangle color="#00BFFF" height={50} width={50} />
            </div>
            {
                sidebar_item.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <div>
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                active={index === activeItem}
                            />
                        </div>
                    </Link>
                ))
            }

        </div >
    )
}

export default Sidebar