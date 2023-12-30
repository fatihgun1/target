import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSubject } from '../../redux/slice/subjectSlice';
export default function CreateSubjectComponent({ setModal, education }) {
    const dispatch = useDispatch();
    const projectState = useSelector(state => state.project);
    
    const [subject, setSubject] = useState({
      description: null,
      youtubeVideoId: null,
      education: education
    });
  
    const onFormChange = e => {
      const { name, value } = e.target;
      setSubject(prev => ({ ...prev, [name]: value }))
    }
  
    const saveTodo = async e => {
      await dispatch(createSubject(subject)).unwrap().then((response) => {
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
        <h3 className='mb-3'>Create Subject</h3>
        <div className='mb-3'>
          <input name="description" className='form-control' placeholder="Tutorial Description" type="text" onChange={onFormChange} />
        </div>
        <div className='mb-3'>
          <input name="youtubeVideoId" className='form-control' placeholder="Youtube video id" type="text" onChange={onFormChange} />
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
