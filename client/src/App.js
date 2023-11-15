import './App.css';
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from './components/Layout';
import LoginPage from './Page/LoginPage';
import RegisterPage from './Page/RegisterPage';
import ProfilePage from './Page/ProfilePage';
import TodosPage from './Page/Todo/TodosPage';
import CreateTodosPage from './Page/Todo/CreateTodosPage';
import TodoPage from './Page/Todo/TodoPage';
import CreateTodoPage from './Page/Todo/CreateTodoPage';

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
