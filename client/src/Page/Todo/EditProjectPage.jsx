import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProjectByCode, updateProject } from '../../redux/slice/projectSlice';

export default function EditProjectPage() {
    const dispatch = useDispatch();
    const { code } = useParams();
    const projectresponse = useSelector(state => state.project);
    const statusresponse = useSelector(state => state.status);
    const [action, setAction] = useState(false);
    const [newTodos, setNewTodos] = useState({
        name: null,
        code: null,
    });

    useEffect(() => {
        dispatch(getProjectByCode(code));
        setNewTodos(prev => ({ ...prev, code: projectresponse.project.code, name: projectresponse.project.name }))
    }, [code, action])

    const updateTodosFrom = async () => {
        await dispatch(updateProject(newTodos)).unwrap()
            .then((response) => {
                if (response.status !== "BAD_REQUEST") {
                    setAction(prev => !prev)
                }
            });
    }

    const onTodosUpdateForm = (e) => {
        const { name, value } = e.target;
        setNewTodos(prev => ({ ...prev, [name]: value, code: projectresponse.project.code }))
    }

    return (
        <div className='container'>
            <div className="row align-items-center">
                <div className="col">
                    <h1 className="display-6">General Setting</h1>
                </div>
                <div className="col-1">
                    <Link to='/project' className='btn btn-sm btn-primary'>Back</Link>
                </div>
            </div>
            <hr className="border border-gray border-1 opacity-50"></hr>

            <div className="container g-4 mb-4">
                <input className="form-control form-control-sm mb-3" type="text" placeholder="Name" defaultValue={projectresponse.project.name} name='name' onChange={onTodosUpdateForm} />
                <input disabled className="form-control form-control-sm mb-3" type="text" defaultValue={projectresponse.project.owner} />
                <input id="x1" disabled className="form-control form-control-sm mb-3" type="text" defaultValue={projectresponse.project.code} />
                <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-primary" onClick={updateTodosFrom}>
                        {projectresponse.loading === true ?
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> :
                            <>update</>
                        }
                    </button>
                </div>
                {projectresponse.success === true ?
                    <div className="alert alert-primary">
                        Updated
                    </div>
                    : null}

                {projectresponse.error &&
                    <div className="alert alert-danger mt-4" >
                        {projectresponse.error}
                    </div>
                }
            </div>
        </div>
    )
}
