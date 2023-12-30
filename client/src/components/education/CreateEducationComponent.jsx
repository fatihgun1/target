import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createEducation } from '../../redux/slice/educationSlice';

export default function CreateEducationComponent({ setModal }) {
    const dispatch = useDispatch();
    const responseeducation = useSelector(state => state.education)
  
    const [education, setEducation] = useState({
      name: null,
      owner: null
    });
  
    const onFormChange = e => {
      const { name, value } = e.target;
      setEducation(prev => ({ ...prev, [name]: value }))
    }
  
    const crateContainer = async () => {
      if(education && education.name){
        dispatch(createEducation(education)).unwrap().then((response) => {
          if (response.status !== "BAD_REQUEST") {
            setModal(prev => !prev);
          }
        });
      }
  
    }
  
    const goBack = () => {
      setModal(prev => !prev);
    }
  
    return (
      <div>
        <h3 className='mb-3'>Start Learning</h3>
        <div className='mb-3'>
          <input name="name" className='form-control' placeholder="Tutorial name" type="text" onChange={onFormChange} />
        </div>
        <div className='row'>
          <div className="col">
            <button className='btn btn-primary' onClick={crateContainer} style={{ width: "100%" }}>Crate</button>
          </div>
          <div className="col">
            <button className='btn btn-danger' onClick={goBack} style={{ width: "100%" }}>Cancel</button>
          </div>
        </div>
        <div>
          {responseeducation.loading && <>Saving...</>}
          {responseeducation.error &&
            <div className="alert alert-danger mt-4" >
              {responseeducation.error}
            </div>
          }
        </div>
      </div>
    )
}
