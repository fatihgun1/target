import React, { useEffect, useState } from 'react'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsComponent from '../../components/project/ProjectsComponent';
import { getProject } from '../../redux/slice/projectSlice';
import GeneralModal from '../../components/modal/GeneralModal';
import CreateProjectComponent from '../../components/project/CreateProjectComponent';

export default function ProjectPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const project = useSelector(state => state.project);
  const [action, setAction] = useState(false);
  const [modal,setModal] = useState(false)

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getProject(user))
  }, [dispatch,action,modal])


  return (
    <div className='container'>
      <div className="row mt-4">
        <div className="col mb-4">
          <GeneralModal modal={modal} setModal={setModal}>
              <CreateProjectComponent setModal={setModal} />
          </GeneralModal>
          <button className='btn btn-outline-primary' onClick={()=>setModal(prev => !prev)}>Create Target</button>
        </div>
      </div>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4 align-items-center">
            {
              project.loading === false ?
                <>
                  {project.projects && project.projects.map((todox, index) => (
                    <ProjectsComponent name={todox.name} key={index} project={todox.code} setAction={setAction} />
                  ))}
                </>
                :
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>

      </div>


    </div>
  )
}
