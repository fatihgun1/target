import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/slice/projectSlice';
export default function CreateProjectComponent({ setModal }) {

  const dispatch = useDispatch();
  const projectState = useSelector(state => state.project);

  const [project, setProject] = useState({
    owner: null,
    name: null
  });

  const onFormChange = e => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }))
  }

  const saveTodo = async e => {
    await dispatch(createProject(project)).unwrap().then((response) => {
      if(response.status !== "BAD_REQUEST"){
        setModal(prev => !prev);
      }
    });
  }

  const goBack = () => {
    setModal(prev => !prev);
  }

  return (
    <div>
      <h3 className='mb-3'>Create project</h3>
      <div className='mb-3'>
        <input name="name" className='form-control' placeholder="what is your target" type="text" onChange={onFormChange} />
      </div>
      <div className='row'>
        <div className="col">
          <button className='btn btn-primary' onClick={saveTodo} style={{width:"100%"}}>Begin</button>
        </div>
        <div className="col">
          <button className='btn btn-danger' onClick={goBack} style={{width:"100%"}}>Cancel</button>
        </div>
      </div>
      <div>
        {projectState.loading && <>Saving...</>}
        {projectState.error && 
          <div className="alert alert-danger mt-4" >
            {projectState.error}
        </div>
        }
      </div>
    </div>
  )
}
