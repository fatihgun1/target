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
    const [action,setAction] = useState(false);
    const [todo, setTodo] = useState([{
        description: null,
        status: null,
        code: null
    }]);

    useEffect(() => {
        dispatch(currentUser());
        getTodos(code)
    }, [action])

    const getTodos = async (code) => {
        await axios.get(`http://localhost:8080/todo/all/${code}`, null, axiosConfig)
            .then((response) => {
                setTodo(response.data)
                console.log(response.data);
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
            <div className="col-8">
                {todo && todo.map((todox, index) => (
                    <TodoComponent setAction={setAction} description={todox.description} code={todox.code} status={todox.status} token={cUser.token}/>
                ))}

            </div>
            <div className="col">
                <button className='btn btn-outline-primary' onClick={onCrateButtonClick} >Add todo</button>
                {visible ? <CreateTodoPage code={code} setAction={setAction} /> : null}
            </div>

        </div>
    )
}
