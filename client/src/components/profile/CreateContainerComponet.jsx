import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createContainer } from '../../redux/slice/packSlice';

export default function CreateContainerComponet({ setModal }) {
  const dispatch = useDispatch();
  const responsecontainer = useSelector(state => state.pack)

  const [container, setContainer] = useState({
    name: null,
    owner: null
  });

  const onFormChange = e => {
    const { name, value } = e.target;
    setContainer(prev => ({ ...prev, [name]: value }))
  }

  const crateContainer = async e => {
    await dispatch(createContainer(container)).unwrap().then((response) => {
      if (response.status !== "BAD_REQUEST") {
        setModal(prev => !prev);
      }
    });
  }

  const goBack = e => {
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
          <button className='btn btn-primary' onClick={crateContainer} style={{ width: "100%" }}>Begin</button>
        </div>
        <div className="col">
          <button className='btn btn-danger' onClick={goBack} style={{ width: "100%" }}>Cancel</button>
        </div>
      </div>
      <div>
        {responsecontainer.loading && <>Saving...</>}
        {responsecontainer.error &&
          <div className="alert alert-danger mt-4" >
            {responsecontainer.error}
          </div>
        }
      </div>
    </div>
  )
}
