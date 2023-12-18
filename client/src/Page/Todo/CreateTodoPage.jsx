import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTodo } from '../../redux/slice/todoSlice';
import { setTodoToProject } from '../../redux/slice/projectSlice';
export default function CreateTodoPage({ projectcode, status }) {
  const [todo, setTodo] = useState({ description: null, status: { code: null}, code: null });
  const [disableAddButton, setDisableAddButton] = useState(false);
  const description = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === undefined) {
      setDisableAddButton(true)
    } else {
      if (status){
        setTodo({ status: { code: status[0].code }, code: projectcode })
      }
    }
  }, [projectcode])

  const onStatusChange = (e) => {
    const { value } = e.target;
    setTodo(prev => ({ ...prev, status: { code: value } }))
  }

  const onCreateTodoButtonClick = () => {
    todo.description = description.current.value
    if (description) {
      dispatch(createTodo(todo)).unwrap().then((response) => {
        if (response.status !== "BAD_REQUEST") {
          dispatch(setTodoToProject(response))
          description.current.value = '';
        }
      });
    }

  }

  return (
    <div className='card'>
      <div className="card-header bg-transparent">
        Add your task
      </div>
      <div className="card-body">
        <textarea className="form-control" rows="3" ref={description}></textarea>
      </div>
      <div className="card-footer bg-transparent">
        <div className="row">
          <div className="col">
            <button className='btn btn-primary' disabled={disableAddButton} style={{ width: '100%' }} onClick={onCreateTodoButtonClick}>Add</button>
          </div>
          <div className="col">
            <select className='form-select' onChange={onStatusChange}>
              {status && status.map((type, index) => (
                <option key={index} name="status" value={type.code}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  )
}
