import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodoListComponent from '../../components/todos/TodoListComponent';
export default function TodosPage() {
  const dispatch = useDispatch();
  const cUser = useSelector(state => state.user);
  const [action,setAction] = useState(false);

  const [todos, setTodos] = useState([{
    name: null,
    code: null
  }]);

  useEffect(() => {
    dispatch(currentUser());
    getTodos(cUser.user)
  }, [action])

  const getTodos = async (user) => {

    await axios.get(`http://localhost:8080/todos/all/${user}`, null, axiosConfig)
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let axiosConfig = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Method": "GET",
      'Authorization': `Bearer ${cUser.token}`
    }
  };


  return (
    <div>
      <Link className='btn btn-outline-primary' to="/todos/create">Create Target</Link>
      {todos && todos.map((todox,index) => (
        <TodoListComponent name={todox.name} key={index} todosCode={todox.code} setAction={setAction} token={cUser.token}/>
      ))}
    </div>
  )
}
