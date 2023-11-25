import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../../redux/slice/todosSlice';

export default function TodoListComponent({ name, todosCode, key, setAction }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTodoDetail = (code) => {
        navigate(`/todo/${code}`)
    }

    const deleteTodo = async (e) => {
        dispatch(deleteTodos({ code: todosCode })).unwrap().then((response) => {
            setAction(prev => !prev)
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="col">
            <div className='card' key={key} style={{ height: "150px" }}>
                <div className="card-body text-center " onClick={() => navigateTodoDetail(todosCode)}>
                    {name}
                </div>
                <div class="card-footer bg-transparent ">
                    <div className="row">
                        <div className="col">
                            <Link className='btn btn-sm btn-primary w-100' to={`/todos/edit/${todosCode}`}>Edit</Link>
                        </div>
                        <div className="col">
                            <button className='btn btn-sm btn-danger w-100' onClick={deleteTodo}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
