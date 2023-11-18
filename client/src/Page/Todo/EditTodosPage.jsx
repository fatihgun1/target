import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import { Link, useParams } from 'react-router-dom';
import StatusCompont from '../../components/todos/StatusCompont';

export default function EditTodosPage() {
    const dispatch = useDispatch();
    const { code } = useParams();
    const cUser = useSelector(state => state.user);
    const [create, setCreate] = useState(false);
    const [action, setAction] = useState(false);
    const [newStatus, setNewStatus] = useState({ todoscode: null, name: null, score: null });
    const [updated, setUpdated] = useState(false);
    const [todos, setTodos] = useState({
        name: null,
        code: null,
        owner: null,
        status: [{ code: null, name: null, score: null }],
    });

    const [newTodos, setNewTodos] = useState({
        name: null,
        code: null,
    });

    useEffect(() => {
        dispatch(currentUser());
        getTodos(code)
        setNewTodos(prev => ({ ...prev, code: todos.code }))
    }, [code, action])

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

    const onCreateButtonClick = () => {
        setCreate(prev => !prev)
    }

    const getTodos = async (code) => {
        await axios.get(`http://localhost:8080/todos/get/${code}`, null, axiosConfig)
            .then((response) => {
                setTodos(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const createStatus = async () => {
        await axios.post(`http://localhost:8080/status/create `, newStatus, axiosConfig)
            .then((response) => {
                setAction(prev => !prev)
                setCreate(prev => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onCreateStatusFormChange = (e) => {
        const { name, value } = e.target;
        setNewStatus(prev => ({ ...prev, [name]: value, todoscode: todos.code }))
    }

    const statusCreateForm = (
        <div className='container'>
            <input class="form-control form-control-sm mb-2" type="text" name='name' placeholder="Name" onChange={onCreateStatusFormChange} />
            <input class="form-control form-control-sm mb-2" type="text" name='score' placeholder="Score" onChange={onCreateStatusFormChange} />
            <div className="d-grid">
                <button className="btn btn-sm btn-primary" type="button" onClick={createStatus}>create</button>
            </div>
        </div>
    );

    const statusPreviewList = (
        <div className="container-fluid mt-4">
            {todos.status && todos.status.map((status, index) => (
                <StatusCompont status={status} setAction={setAction} token={cUser.token} key={index} />
            ))}
        </div>
    );

    const updateTodos = async () => {
        await axios.post(`http://localhost:8080/todos/update`, newTodos, axiosConfig)
            .then((response) => {
                setAction(prev => !prev)
                setUpdated(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onTodosUpdateForm = (e) => {
        const { name, value } = e.target;

        setNewTodos(prev => ({ ...prev, [name]: value, code: todos.code }))
    }

    return (
        <div className='container'>

            <div className="row align-items-center">
                <div className="col">
                    <h1 className="display-6">General Setting</h1>
                </div>
                <div className="col-1">
                    <Link to='/todos' className='btn btn-sm btn-primary'>Back</Link>
                </div>
            </div>
            <hr className="border border-gray border-1 opacity-50"></hr>

            <div className="container g-4 mb-4">
                <input className="form-control form-control-sm mb-3" type="text" placeholder="Name" defaultValue={todos.name} name='name' onChange={onTodosUpdateForm} />
                <input disabled className="form-control form-control-sm mb-3" type="text" placeholder="Name" defaultValue={todos.owner} />
                <input id="x1" disabled className="form-control form-control-sm mb-3" type="text" placeholder="Name" defaultValue={todos.code} />
                <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-primary" onClick={updateTodos}>update</button>
                </div>
                {updated ?
                <div class="alert alert-primary" role="alert">
                   Updated
                </div>
                :null}
            </div>

            <div className="row align-items-center">
                <div className="col">
                    <h1 className="display-6">Status Setting</h1>
                </div>
                <div className="col-2">
                    <button className='btn btn-sm btn-outline-primary' onClick={onCreateButtonClick}>Create Status</button>
                </div>
            </div>

            <hr className="border border-gray border-1 opacity-50 mb-4"></hr>
            {create ? statusCreateForm : statusPreviewList}

        </div>
    )
}
