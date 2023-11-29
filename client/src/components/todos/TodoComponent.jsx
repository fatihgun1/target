import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, updateTodo } from '../../redux/slice/todoSlice';
export default function TodoComponent({ orginalTodo, statusList, setAction }) {
  const [edited, setEdited] = useState();
  const [todo, setTodo] = useState(orginalTodo);
  const dispatch = useDispatch();
  const [error,setError] = useState();

  useEffect(() => {
    setTodo(orginalTodo)
  }, [])

  const deleteSelectedTodo = async () => {
    await dispatch(deleteTodo({ code: todo.code })).unwrap()
      .then((response) => {
        setAction(prev => !prev)
      }).catch((error) => {
        console.log(error)
      })
  }

  const updateSelectedTodo = async () => {
    await dispatch(updateTodo(todo)).unwrap()
      .then((response) => {
        if (response.status !== "BAD_REQUEST") {
          setAction(prev => !prev)
          setEdited(prev => !prev)
          setError(null)
        }else{
          setError(response.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onStatusChange = e => {
    setTodo(prev => ({ ...prev, status: statusList.find(({ code }) => code === e.target.value) }))
  }

  const onDescriptionChange = e => {
    setTodo(prev => ({ ...prev, description: e.target.value }))
  }

  return (
    <div className='card mb-2' key={todo.code}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            {edited ?
              <div className='input-group'>
                <input className='form-control' type='text' defaultValue={todo.description} onChange={onDescriptionChange} />
                <select className='form-select' onChange={onStatusChange} defaultValue={todo.status.code}>
                  {statusList && statusList.map((type, index) => (<option key={index} value={type.code}>{type.name}</option>))}
                </select>
              </div>
              : <>{todo.description} - {todo.status.name} </>}

          </div>
          <div className="col-2">

            {edited ?
              <div className="input-group">
                <button className='btn btn-sm btn-success' onClick={() => setEdited(prev => !prev)}>Cancel</button>
                <button className='btn btn-sm btn-primary' onClick={updateSelectedTodo}>Save</button>
              </div>

              :
              <div className="input-group">
                <button className="btn btn-sm btn-success" onClick={() => setEdited(prev => !prev)}>Edit</button>
                <button className="btn btn-danger" onClick={deleteSelectedTodo}>Delete</button>
              </div>
            }
          </div>
        </div>
        {error&&
          <div className="alert alert-danger mt-4" >
            {error}
          </div>
        }
      </div>
    </div>
  )
}
