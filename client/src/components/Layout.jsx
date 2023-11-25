import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import AuthNavbar from './general/AuthNavbar';


const Layout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <AuthNavbar />
        </div>
      </div>
      <div className="row vh-100">
        <div className="col border-end">
          <SideBar />
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout;