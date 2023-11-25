import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './general/Navbar';

const AuthLayout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Navbar />
        </div>
      </div>

      <div className="row p-0">
        <div className="col m-4 p-0">
          <Outlet />
        </div>
      </div>

    </div>

  )
}

export default AuthLayout;