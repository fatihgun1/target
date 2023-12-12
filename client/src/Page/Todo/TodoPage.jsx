import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CreateTodoPage from './CreateTodoPage';
import TodoComponent from '../../components/todo/TodoComponent';
import { getProjectByCode } from '../../redux/slice/projectSlice';
export default function TodoPage() {
    const { code } = useParams()
    const dispatch = useDispatch();

    const todosresponse = useSelector(state => state.project);

    useEffect(() => {
        dispatch(getProjectByCode(code))
    }, [])

    return (
        <div className='container'>

            <div className="container-fluid bg-dark p-2 mb-2 mt-2 text-white">
                Project: {todosresponse.project.name}
            </div>

            <div className="row mb-4">
                <div className="col">
                    <CreateTodoPage projectcode={todosresponse.project.code} status={todosresponse.project && todosresponse.project.container && todosresponse.project.container.status}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    {todosresponse.project.todos && todosresponse.project.todos.map((todo, index) => (
                        <TodoComponent todo={todo} status={todosresponse.project.container.status} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
