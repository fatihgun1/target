import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../../redux/slice/todoSlice';
export default function TodoComponent({ orginalTodo, statusList, token, setAction }) {
  const [edited, setEdited] = useState();
  const [todo, setTodo] = useState(orginalTodo);
  const dispatch = useDispatch();
  useEffect(()=>{
    setTodo(orginalTodo)
  },[orginalTodo])

  const deleteSelectedTodo = async () => {
    await dispatch(deleteTodo({ code : todo.code })).unwrap()
    .then((response) =>{
      setAction(prev => !prev)
    }).catch((error) => {
      console.log(error)
    })
  }

  const updateSelectedTodo = async () => {
    await dispatch(updateTodo(todo)).unwrap()
    .then((response) => {
      setAction(prev => !prev)
      setEdited(prev => !prev)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const editTodo = async () => {
    setEdited(prev => !prev)
  }

  const onStatusChange = e => {
    setTodo(prev => ({ ...prev, status: statusList.find(({code}) => code === e.target.value)}))
  }

  const onDescriptionChange = e => {
    setTodo(prev => ({ ...prev, description: e.target.value}))

  }

  return (
    <div className='card mb-2' key={todo.code}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            {edited ?
              <div className='input-group'>
                <input className='form-control' type='text' defaultValue={todo.description} onChange={onDescriptionChange}/>
                <select className='form-select' onChange={onStatusChange} defaultValue={todo.status.code}>
                  {statusList && statusList.map((type, index) => (<option key={index} value={type.code}>{type.name}</option>))}
                </select>
            
              </div>
              : <>{todo.description} - {todo.status.name} </>}

          </div>
          <div className="col-2">
       
            {edited ? 
            <button className='btn btn-sm btn-primary' onClick={updateSelectedTodo}>Save</button>
            :
            <button className="btn btn-sm btn-success" onClick={editTodo}>Edit</button>
            }
            <button type="button" className="btn-close" aria-label="Close" onClick={deleteSelectedTodo}></button>
          </div>
        </div>

      </div>
    </div>
  )
}
