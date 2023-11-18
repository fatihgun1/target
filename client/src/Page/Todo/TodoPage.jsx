import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import CreateTodoPage from './CreateTodoPage';
import TodoComponent from '../../components/todos/TodoComponent';
export default function TodoPage() {
    const { code } = useParams()
    const dispatch = useDispatch();

    const cUser = useSelector(state => state.user);
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState(false);

    const [todos, setTodos] = useState({
        name: null,
        code: null,
        owner: null,
        status: [{ code: null, name: null, score: null }],
        todos: [{
            description: null,
            status: { code: null, name: null, score: null },
            code: null
        }]

    });

    useEffect(() => {
        dispatch(currentUser());
        getTodos(code)
    }, [action])

    const getTodos = async (code) => {
        await axios.get(`http://localhost:8080/todos/get/${code}`, null, axiosConfig)
            .then((response) => {
                setTodos(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    let axiosConfig = {
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Method": "GET",
            'Authorization': `Bearer ${cUser.token}`
        }
    };

    const onCrateButtonClick = () => {
        setVisible(visible => !visible)
    }

    return (
        <div className='row'>
            <nav className="navbar bg-body-tertiary mb-4">
                <div className="container-fluid">
                    <p className='navbar-brand'>{todos.name}</p>
                    <button className='btn btn-outline-primary' onClick={onCrateButtonClick} >Create todo</button>
                </div>
            </nav>
            <div className={visible ? "col-8" : "col"}>
                {todos.todos && todos.todos.map((todo, index) => (
                    <TodoComponent setAction={setAction} orginalTodo={todo} statusList={todos.status} token={cUser.token} />
                ))}
            </div>
            {visible ?
                <div className="col">
                    <CreateTodoPage code={todos.code} status={todos.status} setAction={setAction} />
                </div>
            : null}
        </div>
    )
}
