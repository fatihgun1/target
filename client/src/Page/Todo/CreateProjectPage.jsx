import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../redux/slice/projectSlice';
export default function CreateProjectPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cUser = useSelector(state => state.user);
  const projectresponse = useSelector(state => state.project);

  const [project, setProject] = useState({
    owner: null,
    name: null
  });

  const onFormChange = e => {
    dispatch(currentUser());
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }))
    setProject(prev => ({ ...prev, owner: cUser.user }))
  }

  const saveTodo = async e => {
    await dispatch(createProject(project)).unwrap().then((response) => {
        navigate("/project")
    }).catch((err) => {
      console.log(err);
    }
    );
  }

  const goBack = e => {
    navigate("/project")
  }

  return (
    <div>
      <h3>Choose your target?</h3>
      <div>
        <input name="name" placeholder="what is your target" type="text" onChange={onFormChange} />
      </div>
      <div>
        <button className='btn btn-primary' onClick={saveTodo}>Begin</button>
        <button className='btn btn-primary' onClick={goBack}>Cancel</button>
      </div>
      <div>
        {projectresponse.loading && <>Saving...</>}
      </div>
    </div>
  )
}
