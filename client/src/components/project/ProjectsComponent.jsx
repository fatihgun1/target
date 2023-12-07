import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/slice/projectSlice';

export default function ProjectsComponent({ name, project, key, setAction }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTodoDetail = (code) => {
        navigate(`/todo/${code}`)
    }

    const deleteTodo = async (e) => {
        dispatch(deleteProject({ code: project })).unwrap().then((response) => {
            setAction(prev => !prev)
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="col">
            <div className='card' key={key} style={{ height: "150px" }}>
                <div className="card-body text-center " onClick={() => navigateTodoDetail(project)}>
                    {name}
                </div>
                <div className="card-footer bg-transparent ">
                    <div className="row">
                        <div className="col">
                            <Link className='btn btn-sm btn-primary w-100' to={`/project/edit/${project}`}>Edit</Link>
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
