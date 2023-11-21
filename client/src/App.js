import './App.css';
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from './components/Layout';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import ProfilePage from './Page/Profile/ProfilePage';
import SettingsPage from './Page/Profile/SettingsPage';
import TodosPage from './Page/Todo/TodosPage';
import CreateTodosPage from './Page/Todo/CreateTodosPage';
import TodoPage from './Page/Todo/TodoPage';
import CreateTodoPage from './Page/Todo/CreateTodoPage';
import EditTodosPage from './Page/Todo/EditTodosPage';

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
