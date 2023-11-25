import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createTodos } from '../../redux/slice/todosSlice';
export default function CreateTodosPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cUser = useSelector(state => state.user);
  const todoState = useSelector(state => state.todos);

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
    await dispatch(createTodos(todos)).unwrap().then((response) => {
        navigate("/todos")
    }).catch((err) => {
      console.log(err);
    }
    );
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
      <div>
        {todoState.loading && <>Saving...</>}
      </div>
    </div>
  )
}
