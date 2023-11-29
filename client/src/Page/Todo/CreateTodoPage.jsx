import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import { createTodo } from '../../redux/slice/todoSlice';
export default function CreateTodoPage({ code, status, setAction }) {

  const dispatch = useDispatch();
  const responsetodo = useSelector(state => state.todo);
  const [textAreaFocus,setTextAreaFocus] = useState(false)
  const [todo, setTodo] = useState({
    description: null,
    status: status[0],
    code: code
  });

  useEffect(() => {
    setTodo(prev => ({ ...prev, status: status[0], code: code }))
  }, [setAction])

  const onFormChange = e => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }))
  }

  const saveTodo = async e => {
    await dispatch(createTodo(todo)).unwrap()
      .then((response) => {
        if (response.status !== "BAD_REQUEST") {
          setAction(prev => !prev)
          setTextAreaFocus(false)
          
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onStatusChange = e => {
    setTodo(prev => ({ ...prev, status: status.find(({ code }) => code === e.target.value) }))
  }

  useEffect(() => {
    dispatch(currentUser());
  }, [setAction])

  return (
    <div className='card p-2 mb-3'>
      <div className="form-floating mb-2" >
        <textarea className="form-control" id="todotext" name='description' onFocus={() => setTextAreaFocus(true)} onChange={onFormChange} style={textAreaFocus ? {height:"100px"} :  {height:"10px"}}></textarea>
        <label for="todotext">Add todo</label>
      </div>
      {textAreaFocus &&
      <div className='row g-2'>
        <div className="col-md ">
          <button className='btn btn-primary w-100' onClick={saveTodo}>Create</button>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <select id='todotext1' className='form-select' onChange={onStatusChange}>
              {status && status.map((type, index) => (<option key={index} value={type.code}>{type.name}</option>))}
            </select>
            <label for="todotext1">Status</label>
          </div>
        </div>
      </div>
    }

      <div className="mt-3">
        {responsetodo.error &&
          <div className="alert alert-danger mt-4" >
            {responsetodo.error}
          </div>
        }
      </div>
    </div>
  )
}
