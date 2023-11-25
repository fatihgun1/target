import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import CreateTodoPage from './CreateTodoPage';
import TodoComponent from '../../components/todos/TodoComponent';
import { getTodosByCode } from '../../redux/slice/todosSlice';
export default function TodoPage() {
    const { code } = useParams()
    const dispatch = useDispatch();
    const cUser = useSelector(state => state.user);
    const todosresponse = useSelector(state => state.todos);
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState(false);

    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTodosByCode(code))
    }, [action])

    const onCrateButtonClick = () => {
        console.log(todosresponse.todosSingle);
        setVisible(visible => !visible)
    }

    return (
        <div className='row'>
            <nav className="navbar bg-body-tertiary mb-4">
                <div className="container-fluid">
                    <p className='navbar-brand'>{todosresponse.todosSingle.name}</p>
                    <button className='btn btn-outline-primary' onClick={onCrateButtonClick} >Create todo</button>
                </div>
            </nav>
            <div className={visible ? "col-8" : "col"}>
                {todosresponse.todosSingle.todos && todosresponse.todosSingle.todos.map((todo, index) => (
                    <TodoComponent setAction={setAction} orginalTodo={todo} statusList={todosresponse.todosSingle.status} token={cUser.token} />
                ))}
            </div>
            {visible ?
                <div className="col">
                    <CreateTodoPage code={todosresponse.todosSingle.code} status={todosresponse.todosSingle.status} setAction={setAction} />
                </div>
            : null}
        </div>
    )
}
