import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContainer, disablePublishButton, getBackPack } from '../../redux/slice/packSlice';
import GeneralModal from '../modal/GeneralModal';
import CreateContainerComponet from './CreateContainerComponet';
import { useNavigate } from 'react-router-dom';
import { publishContainer } from '../../redux/slice/marketSilce';

export default function BackpackComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responsepack = useSelector(state => state.pack);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        dispatch(getBackPack());
    }, [dispatch])

    const onProjectButtonClick = (code) => {
        dispatch(deleteContainer({ code: code }))
    }

    const onPublishButtonClick = (code) => {
        dispatch(publishContainer({ code: code })).unwrap().then((response)=>{
            if(response===true){
                dispatch(disablePublishButton({ code: code }))
            }
        })
    }

    return (
        <div>
            <GeneralModal modal={modal} setModal={setModal}>
                <CreateContainerComponet setModal={setModal} />
            </GeneralModal>

            <div className="mb-2">
                <div className="col">
                    <button className='btn btn-sm btn-outline-danger' onClick={() => setModal(prev => !prev)}>Create Container</button>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-2 text-center">
                {responsepack && responsepack.containers && responsepack.containers.map((container, index) => (
                    <div className='col' key={index}>
                        <div class="card justify-content-center onHover " style={{ height: '120px' }} >
                            <div className="card-header  bg-transparent">
                                <div className="row">
                                    <div className="col d-flex justify-content-start">
                                        {container.isPublished === false &&
                                            <button className='btn btn-sm btn-outline-success' onClick={() => onPublishButtonClick(container.code)}>Publish</button>
                                        }

                                    </div>
                                    <div className="col d-flex justify-content-end ">
                                        <button className='btn btn-sm btn-outline-danger' onClick={() => onProjectButtonClick(container.code)}>del</button>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body" onClick={() => navigate(`/container/show/${container.code}`)}>
                                {container.name}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
