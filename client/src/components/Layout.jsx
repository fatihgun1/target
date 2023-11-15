import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';


const Layout = () => {
  return (
    <div className="container">
      <div className="row">
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