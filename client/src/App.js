import './App.css';
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from './components/Layout';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';

function App() {
  const router = createBrowserRouter(
    [{
      path: "/",
      element: <Layout/> ,
      children: [
        {
          path: "/",
          element: (
            "Home"
          )
        },
        {
          path: "/login",
          element: ( <LoginPage/>
          )
        },
        {
          path: "/register",
          element: (
            <RegisterPage/>
          )
        }
      ]
    }]
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
