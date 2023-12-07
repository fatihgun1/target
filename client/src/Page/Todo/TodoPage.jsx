import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import CreateTodoPage from './CreateTodoPage';
import TodoComponent from '../../components/todo/TodoComponent';
import { getProjectByCode } from '../../redux/slice/projectSlice';
export default function TodoPage() {
    const { code } = useParams()
    const dispatch = useDispatch();
    const cUser = useSelector(state => state.user);
    const todosresponse = useSelector(state => state.project);
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState(false);

    useEffect(() => {
        dispatch(currentUser());
        dispatch(getProjectByCode(code))
    }, [action])

    return (
        <div className='container'>

            <div className="container-fluid ext-body-secondary bg-light-subtle p-2 mb-2 mt-2">
               {todosresponse.project.name}
            </div>

            <div className="col">
                <CreateTodoPage code={todosresponse.project.code} status={todosresponse.project.status} setAction={setAction} />
            </div>
            <div className={visible ? "col-8" : "col"}>
                {todosresponse.project.todos && todosresponse.project.todos.map((todo, index) => (
                    <TodoComponent setAction={setAction} orginalTodo={todo} statusList={todosresponse.project.status} token={cUser.token} />
                ))}
            </div>
        </div>
    )
}
