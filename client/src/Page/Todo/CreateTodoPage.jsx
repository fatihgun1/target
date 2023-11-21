import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import axios from 'axios';
export default function CreateTodoPage({code,status,setAction}) {

  const dispatch = useDispatch();
  const cUser = useSelector(state => state.user);
  
  let axiosConfig = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Method": "POST",
      'Authorization': `Bearer ${cUser.token}`
    }
  };

  const [todo, setTodo] = useState({
    description: null,
    status:status[0],
    code:code
  });

  useEffect(() => {
    setTodo(prev => ({ ...prev, status: status[0],code:code }))
  }, [setAction])

  const onFormChange = e => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }))
  }

  const saveTodo = async e => {
    e.preventDefault();
    await axios.post("http://localhost:8080/todo/create", todo, axiosConfig)
      .then((response) => {
        setAction(prev=>!prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onStatusChange = e => {
    setTodo(prev => ({ ...prev, status: status.find(({code}) => code === e.target.value)}))
  }

  useEffect(() => {
    dispatch(currentUser());
  }, [setAction])

  return (
    <div>
      <h3>Add todo</h3>
      <div>
        <input name="description" placeholder="what is your target" type="text" onChange={onFormChange} />
        <select className='form-select' onChange={onStatusChange}>
          {status && status.map((type, index) => (<option key={index} value={type.code}>{type.name}</option>))}
        </select>
      </div>
      <div>
        <button className='btn btn-primary' onClick={saveTodo}>Create</button>
      </div>
    </div>
  )
}
