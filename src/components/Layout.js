import React from "react";
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu } from "../data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from 'antd';

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successful!');
    navigate('/login');
  }

  // Fitness consultant menu
  const fitnessConsultantMenu = [
    {
      name: 'Home',
      path: '/',
      icon: "fa-solid fa-house",
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: "fa-solid fa-list",
    },
    {
      name: 'Profile',
      path: `/fitness-consultant/profile/${user?._id}`,
      icon: "fa-regular fa-user",
    },
  ];

  // Rendering menu list based on user role
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user.isFitnessConsultant
    ? fitnessConsultantMenu
    : userMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>FITNESS CONSULTANT APPOINTMENT</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map(menu => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && 'active'}`} key={menu.path}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item`} onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <Link to='/login'>Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <h1 style={{ textAlign: 'center', margin: '0 auto' }}>Oxygen Fitness Center</h1> 
              <Badge count={user?.notification.length} onClick={() => navigate('/notification')}>
                <i className="fa-solid fa-bell" style={{ cursor: `pointer` }}></i>
              </Badge>
              <Link to={`/fitnessConsultant/profile/${user?._id}`}>{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
