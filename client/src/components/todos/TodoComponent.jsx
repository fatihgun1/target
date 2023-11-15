import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function TodoComponent({ description, code, status, token, setAction }) {
  const [edited, setEdited] = useState();
  let statusList = ['Not Start', 'On Going', 'Done'];
  const [todo, setTodo] = useState({
    description: description,
    status: status,
    code: code
});

  let axiosConfig = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Method": "GET",
      'Authorization': `Bearer ${token}`
    }
  };

  const deleteTodo = async () => {
    console.log(code);
    await axios.post(`http://localhost:8080/todo/delete`, { code }, axiosConfig)
      .then((response) => {
        setAction(prev => !prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateTodo = async () => {
    console.log(todo);
    await axios.post(`http://localhost:8080/todo/update`, todo, axiosConfig)
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
    setTodo(prev => ({ ...prev, status: e.target.value}))
  }

  const onDescriptionChange = e => {
    setTodo(prev => ({ ...prev, description: e.target.value}))
  }

  return (
    <div className='card mb-2' key={code}>
      <div className="card-body">
        <div className="row">
          <div className="col">
            {edited ?
              <div>
                <input type='text' value={todo.description} onChange={onDescriptionChange}/>
                <select onChange={onStatusChange} defaultValue={status}>
                  {statusList && statusList.map((type, index) => (<option key={index} value={type}>{type}</option>))}
                </select>
                
              </div>
              : <>{description} - {status} </>}

          </div>
          <div className="col-2">
       
            {edited ? 
            <button className='btn btn-sm btn-primary' onClick={updateTodo}>Save</button>
            :
            <button class="btn btn-sm btn-success" onClick={editTodo}>Edit</button>
            }
            <button type="button" class="btn-close" aria-label="Close" onClick={deleteTodo}></button>
          </div>
        </div>

      </div>
    </div>
  )
}
