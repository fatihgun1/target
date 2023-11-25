import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../../redux/slice/todosSlice';
export default function TodoListComponent({ name, todosCode, key, setAction,token }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTodoDetail = (code) => {
        navigate(`/todo/${code}`)
    }
    
    const deleteTodo = async (e) => {
        dispatch(deleteTodos({ code: todosCode })).unwrap().then((response) => {
            setAction(prev=>!prev)
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='card mb-2' key={key}>
            <div className="card-body">
                <div className="row">
                    <div className="col-10" onClick={() => navigateTodoDetail(todosCode)}>
                        {name}
                    </div>
                    <div className="col">
                    <div className="input-group">
                        <Link className='btn btn-sm btn-primary' to={`/todos/edit/${todosCode}`}>Edit</Link>
                        <button className='btn btn-sm btn-danger' onClick={deleteTodo}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
