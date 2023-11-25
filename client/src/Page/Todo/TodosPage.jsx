import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodoListComponent from '../../components/todos/TodoListComponent';
import { getTodos } from '../../redux/slice/todosSlice';

export default function TodosPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const todos = useSelector(state => state.todos);
  const [action, setAction] = useState(false);


  useEffect(() => {
    dispatch(currentUser());
    dispatch(getTodos(user))
  }, [dispatch, action])


  return (
    <div className='container'>
      <div className="row">
        <div className="col mb-4">
          <Link className='btn btn-outline-primary' to="/todos/create">Create Target</Link>
        </div>
      </div>
      <div className="container text-center ">
        <div className="row align-items-center">
          <div className="col">
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


    </div>
  )
}
