import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getContainer, replaceContainer, updateContainer } from '../../redux/slice/packSlice';
import BadgeComponent from '../../components/profile/BadgeComponent';
import CreateBadgeComponent from '../../components/profile/CreateBadgeComponent';
import StatusCompont from '../../components/todo/StatusCompont';
import CreateStatusComponent from '../../components/profile/CreateStatusComponent';
import { getProject } from '../../redux/slice/projectSlice';

export default function ContainerPage() {
    const { code } = useParams()
    const dispatch = useDispatch();
    const responsepatch = useSelector(state => state.pack);
    const responseproject = useSelector(state => state.project)
    const container = responsepatch.containers.find(item => item.code === code);
    const [replace,setReplace] = useState();
    const [con, setCon] = useState();
    useEffect(() => {
        if (!responsepatch.success) {
            dispatch(getContainer({ code: code })).unwrap().then((response) => {
                setCon(response)
            })
        }
        dispatch(getProject())
        setReplace({projectCode:responseproject.projects[0].code,containerCode:code})
    }, [code])

    const onCrateFormChange = (e) => {
        const { name, value } = e.target;
        setCon(prev => ({ ...prev, [name]: value, code: code }))
    }

    const onUpdateButtonClick = () => {
        dispatch(updateContainer(con))
    }

    const onProjectSelect = (e) => {
        const selectedProjectCode = e.target.value;
        setReplace(prev=> ({...prev,projectCode:selectedProjectCode}))
    }

    const setContainerToProject  = () => {
        console.log(replace);
        dispatch(replaceContainer(replace))
    } 

    return (
        <div className='container p-4'>
            <div className="row">
                <div className="col">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Container Name</span>
                        </div>
                        <input className="form-control" disabled={responsepatch.loading} name='name' onChange={onCrateFormChange} defaultValue={container && container.name} />
                        <button className='btn btn-sm btn-primary' onClick={onUpdateButtonClick}>Update</button>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <select className='form-select' onChange={onProjectSelect}>
                                {responseproject && responseproject.projects && responseproject.projects.map((type, index) => (
                                    <option key={index} value={type.code}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto">
                            <button className='btn btn-primary' onClick={setContainerToProject}>
                                {responsepatch.loading ? <>Loadingg....</> : <>Set to project</>}
                                
                                </button>
                        </div>
                    </div>


                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-transparent">
                            <div className="row">
                                <div className="col">Status</div>
                                <div className="col d-flex justify-content-end"><CreateStatusComponent code={code} /></div>
                            </div>
                        </div>
                        <div className="card-body">
                            {container && container.status && container.status.map((status, index) => (
                                <StatusCompont status={status} key={index} />
                            ))}
                        </div>
                    </div>

                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-transparent">
                            <div className="row">
                                <div className="col">Badge</div>
                                <div className="col d-flex justify-content-end"><CreateBadgeComponent code={code} /></div>
                            </div>
                        </div>
                        <div className="card-body">
                            {container && container.badges &&
                                container.badges.map((badge, index) => (
                                    <BadgeComponent badge={badge} key={index} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
