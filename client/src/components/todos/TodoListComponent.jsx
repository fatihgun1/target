import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function TodoListComponent({ name, todosCode, key, setAction,token }) {
    const navigate = useNavigate();

    const navigateTodoDetail = (code) => {
        navigate(`/todo/${code}`)
    }
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
        console.log(todosCode);
        await axios.post(`http://localhost:8080/todos/delete`, { "code": todosCode }, axiosConfig)
            .then((response) => {
                setAction(prev => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='card mb-2' key={key}>
            <div className="card-body">

                <div className="row">
                    <div className="col-11" onClick={() => navigateTodoDetail(todosCode)}>
                        {name}
                    </div>
                    <div className="col">
                        <button type="button" class="btn-close" aria-label="Close" onClick={deleteTodo}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
