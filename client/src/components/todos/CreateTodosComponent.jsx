import React, { useEffect, useState } from 'react'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createTodos } from '../../redux/slice/todosSlice';
export default function CreateTodosComponent({ setModal }) {

  const dispatch = useDispatch();


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
      setModal(prev => !prev);
    }).catch((err) => {
      console.log(err);
    }
    );
  }

  const goBack = e => {
    setModal(prev => !prev);
  }

  return (
    <div>
      <h3 className='mb-3'>Create project</h3>
      <div className='mb-3'>
        <input name="name" className='form-control' placeholder="what is your target" type="text" onChange={onFormChange} />
      </div>
      <div className='row'>
        <div className="col">
          <button className='btn btn-primary' onClick={saveTodo} style={{width:"100%"}}>Begin</button>
        </div>
        <div className="col">
          <button className='btn btn-danger' onClick={goBack} style={{width:"100%"}}>Cancel</button>
        </div>
      </div>
      <div>
        {todoState.loading && <>Saving...</>}
      </div>
    </div>
  )
}
