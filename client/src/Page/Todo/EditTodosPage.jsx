import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import { Link, useParams } from 'react-router-dom';
import StatusCompont from '../../components/todos/StatusCompont';
import { getTodosByCode, updateTodos } from '../../redux/slice/todosSlice';
import { createStatus } from '../../redux/slice/statusSlice';
import GeneralModal from '../../components/modal/GeneralModal';

export default function EditTodosPage() {
    const dispatch = useDispatch();
    const { code } = useParams();
    const todosresponse = useSelector(state => state.todos);
    const [action, setAction] = useState(false);
    const [newStatus, setNewStatus] = useState({ todoscode: null, name: null, score: null });
    const [modal, setModal] = useState(false);
    const [newTodos, setNewTodos] = useState({
        name: null,
        code: null,
    });

    useEffect(() => {
        dispatch(currentUser());
        dispatch(getTodosByCode(code));
        setNewTodos(prev => ({ ...prev, code: todosresponse.todosSingle.code }))
    }, [code, action,modal])


    const createNewStatus = async () => {
        await dispatch(createStatus(newStatus)).unwrap().then((response) => {
            setAction(prev => !prev)
            setModal(prev => !prev)

        }).catch((err) => {
            console.log(err);
        });
    }

    const updateTodosFrom = async () => {
        await dispatch(updateTodos(newTodos)).unwrap()
            .then((response) => {
                setAction(prev => !prev)
            }).catch((err) => {
                console.log(err);
            });
    }

    const onCreateStatusFormChange = (e) => {
        const { name, value } = e.target;
        setNewStatus(prev => ({ ...prev, [name]: value, todoscode: todosresponse.todosSingle.code }))
    }

    const onTodosUpdateForm = (e) => {
        const { name, value } = e.target;
        setNewTodos(prev => ({ ...prev, [name]: value, code: todosresponse.todosSingle.code }))
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
                <input className="form-control form-control-sm mb-3" type="text" placeholder="Name" defaultValue={todosresponse.todosSingle.name} name='name' onChange={onTodosUpdateForm} />
                <input disabled className="form-control form-control-sm mb-3" type="text" defaultValue={todosresponse.todosSingle.owner} />
                <input id="x1" disabled className="form-control form-control-sm mb-3" type="text" defaultValue={todosresponse.todosSingle.code} />
                <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-primary" onClick={updateTodosFrom}>
                        {todosresponse.loading === true ?
                            <div class="spinner-grow" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> :
                            <>update</>
                        }
                    </button>
                </div>
                {todosresponse.success === true ?
                    <div className="alert alert-primary">
                        Updated
                    </div>
                    : null}
            </div>

            <div className="row align-items-center">
                <div className="col">
                    <h1 className="display-6">Status Setting</h1>
                </div>
                <div className="col-2">
                    <button className='btn btn-sm btn-outline-primary' onClick={() => setModal(prev => !prev)}>Create Status</button>
                </div>
            </div>

            <hr className="border border-gray border-1 opacity-50 mb-4"></hr>
            <GeneralModal modal={modal} setModal={setModal}>
                <div className='container'>
                    <input className="form-control form-control-sm mb-2" type="text" name='name' placeholder="Name" onChange={onCreateStatusFormChange} />
                    <input className="form-control form-control-sm mb-2" type="text" name='score' placeholder="Score" onChange={onCreateStatusFormChange} />
                    <div className="d-grid">
                        <button className="btn btn-sm btn-primary" type="button" onClick={createNewStatus}>create</button>
                    </div>
                </div>
            </GeneralModal>
            <div className="row">
                <div className="col">
                    <div className="container-fluid mt-4">
                        {todosresponse.todosSingle.status && todosresponse.todosSingle.status.map((status, index) => (
                            <StatusCompont status={status} setAction={setAction} key={index} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
