import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import ProfilePage from './Page/Profile/ProfilePage';
import SettingsPage from './Page/Profile/SettingsPage';
import ProjectPage from './Page/Todo/ProjectPage';
import TodoPage from './Page/Todo/TodoPage';
import EditProjectPage from './Page/Todo/EditProjectPage'
import CreateTodoPage from './Page/Todo/CreateTodoPage';
import Homepage from './Page/Homepage';
import ContainerPage from './Page/Profile/ContainerPage';
import MarketPage from './Page/MarketPage';
function App() {

  const authRouter = createBrowserRouter(
    [{
      path: "/",
      element: <Layout/> ,
      children: [
        {
          path: "/market",
          element: (
            <MarketPage/>
          )
        },
        {
          path: "/profile",
          element: (
            <ProfilePage/>
          )
        },
        {
          path: "/profile/settings",
          element: (
            <SettingsPage/>
          )
        },
        {
          path: "/project",
          element: (
            <ProjectPage/>
          )
        },
        {
          path: "/todo/:code",
          element: (
            <TodoPage/>
          )
        },
        {
          path: "/todo/create/:code",
          element: (
            <CreateTodoPage/>
          )
        },
        {
          path: "/project/edit/:code",
          element: (
            <EditProjectPage/>
          )
        },
        {
          path: "/container/show/:code",
          element: (
            <ContainerPage/>
          )
        },
        {
          path: "*",
          element: (
            "Not Found"
          )
        }
      ]
    }]
  );

  const router = createBrowserRouter(
    [{
      path: "/",
      element: <AuthLayout/> ,
      children: [
        {
          path: "/",
          element: (
            <Homepage/>
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
        },
        {
          path: "*",
          element: (
            "Not Found"
          )
        }
      ]
    }]
  );

  return (
    <div className="App">
      { localStorage.getItem("token") !== null ? <RouterProvider router={authRouter} /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
