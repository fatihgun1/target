import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function CreateTodosPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cUser = useSelector(state => state.user);

  let axiosConfig = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Method":"POST",
      'Authorization': `Bearer ${cUser.token}`
    }
  };

  const [todos, setTodos] = useState({
    owner: null,
    name: null
  });

  const onFormChange = e => {
    dispatch(currentUser());
    const { name, value } = e.target;
    setTodos(prev => ({ ...prev, [name]: value }))
    setTodos(prev => ({ ...prev, owner: cUser.user }))
  }


  const saveTodo = async e => {
    e.preventDefault();

    await axios.post("http://localhost:8080/todos/create", todos, axiosConfig)
      .then((response) => {
        navigate("/todos")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const goBack = e => {
    navigate("/todos")
  }

  return (
    <div>
      <h3>Choose your target?</h3>
      <div>
        <input name="name" placeholder="what is your target" type="text" onChange={onFormChange} />
      </div>
      <div>
        <button className='btn btn-primary' onClick={saveTodo}>Begin</button>
        <button className='btn btn-primary' onClick={goBack}>Cancel</button>
      </div>
    </div>
  )
}
