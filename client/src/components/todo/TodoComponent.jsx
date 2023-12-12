import React, {  useState } from 'react'
import GeneralModal from '../modal/GeneralModal';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo as fetchTodo} from '../../redux/slice/todoSlice';
import {  deleteTodoInProject, updateTodoInProject } from '../../redux/slice/projectSlice';
export default function TodoComponent({ todo, status, key }) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [updateTodo, setUpdateTodo] = useState(() => todo);

  const onUpdateTodoButtonClick = () => {
    dispatch(fetchTodo(updateTodo)).unwrap().then((response)=> {
      
      if(response){
        dispatch(updateTodoInProject(response))
        setModal(prev => !prev)
      }
    });
  }

  const onDeleteTodoButtonClick = () => {
      dispatch(deleteTodo({code:todo.code})).unwrap().then((response) => {
          dispatch(deleteTodoInProject({code:todo.code}));
          setModal(prev => !prev)
      })
  }

  const onFormCange = (e) => {
    const { name, value } = e.target;
    setUpdateTodo(prev => ({ ...prev, [name]: value }))
  }
  const onStatusChange = e => {
    setUpdateTodo(prev => ({ ...prev, status: { code: e.target.value } }))
  }

  return (
    <div key={key}>
      <GeneralModal modal={modal} setModal={setModal}>
        <input className="form-control form-control-sm mb-2" type="text" name='description' placeholder="Score" onChange={onFormCange} defaultValue={todo.description} />
        <select className='form-select  mb-2' defaultValue={todo.status && todo.status.code} onChange={onStatusChange}>
          {status && status.map((statu, index) => (
            <option key={index} value={statu.code}>{statu.name}</option>
          ))}
        </select>
        <button className='btn btn-sm btn-outline-danger mb-1' onClick={onDeleteTodoButtonClick} style={{width:'100%'}}>Delete</button>
        <div className='row'>
          <div className="col">
            <button className='btn btn-success' onClick={onUpdateTodoButtonClick} style={{ width: "100%" }}>Update</button>
          </div>
          <div className="col">
            <button className='btn btn-primary' onClick={() => setModal(prev => !prev)} style={{ width: "100%" }}>Cancel</button>
          </div>
        </div>
      </GeneralModal>
      <div className="card mb-2">
        <div className="card-body">
          <div className='row ' onClick={() => setModal(prev => !prev)}>
            <div className="col">
              Decription : {todo.description}
            </div>
            <div className="col">
              Status : {todo.status && todo.status.name}
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
