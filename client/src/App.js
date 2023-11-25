import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import ProfilePage from './Page/Profile/ProfilePage';
import SettingsPage from './Page/Profile/SettingsPage';
import TodosPage from './Page/Todo/TodosPage';
import CreateTodosPage from './Page/Todo/CreateTodosPage';
import TodoPage from './Page/Todo/TodoPage';
import CreateTodoPage from './Page/Todo/CreateTodoPage';
import EditTodosPage from './Page/Todo/EditTodosPage';
import Homepage from './Page/Homepage';
function App() {

  const authRouter = createBrowserRouter(
    [{
      path: "/",
      element: <Layout/> ,
      children: [
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
          path: "/todos",
          element: (
            <TodosPage/>
          )
        },
        {
          path: "/todos/create",
          element: (
            <CreateTodosPage/>
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
          path: "/todos/edit/:code",
          element: (
            <EditTodosPage/>
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
