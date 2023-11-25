import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodoListComponent from '../../components/todos/TodoListComponent';
import { getTodos } from '../../redux/slice/todosSlice';
import GeneralModal from '../../components/modal/GeneralModal';
import CreateTodosComponent from '../../components/todos/CreateTodosComponent';

export default function TodosPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const todos = useSelector(state => state.todos);
  const [action, setAction] = useState(false);
  const [modal,setModal] = useState(false)

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getTodos(user))
  }, [dispatch,action,modal])


  return (
    <div className='container'>
      <div className="row mt-4">
        <div className="col mb-4">
          <GeneralModal modal={modal} setModal={setModal}>
              <CreateTodosComponent setModal={setModal} />
          </GeneralModal>
          <button className='btn btn-outline-primary' onClick={()=>setModal(prev => !prev)}>Create Target</button>
        </div>
      </div>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4 align-items-center">
            {
              todos.loading === false ?
                <>
                  {todos.todos && todos.todos.map((todox, index) => (
                    <TodoListComponent name={todox.name} key={index} todosCode={todox.code} setAction={setAction} />
                  ))}
                </>
                :
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>

      </div>


    </div>
  )
}
