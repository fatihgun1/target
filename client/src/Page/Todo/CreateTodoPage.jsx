import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTodo } from '../../redux/slice/todoSlice';
import { setTodoToProject } from '../../redux/slice/projectSlice';
export default function CreateTodoPage({ projectcode, status }) {
  const [todo, setTodo] = useState({ description: null, status: { code: null }, code: null });
  const [disableAddButton, setDisableAddButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === undefined) {
      setDisableAddButton(true)
    } else {
      setTodo({ status: { code: status[0].code }, code: projectcode })
    }
  }, [dispatch])

  const onStatusChange = (e) => {
    const { value } = e.target;
    setTodo(prev => ({ ...prev, status: { code: value } }))
  }

  const onFormCange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }))
  }

  const onCreateTodoButtonClick = () => {
    dispatch(createTodo(todo)).unwrap().then((response) => {
      if (response.status !== "BAD_REQUEST") {
        dispatch(setTodoToProject(response))
        setTodo({description: null, status: { code: status[0].code }, code: projectcode })
      }
    });
  }

  return (
    <div className='card'>
      <div className="card-header bg-transparent">
        Add your task
      </div>
      <div className="card-body">
        <textarea className="form-control" name='description' rows="3" onChange={onFormCange}></textarea>
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
