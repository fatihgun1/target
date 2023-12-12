import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContainer, getBackPack } from '../../redux/slice/packSlice';
import GeneralModal from '../modal/GeneralModal';
import CreateContainerComponet from './CreateContainerComponet';
import { useNavigate } from 'react-router-dom';

export default function BackpackComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responsepack = useSelector(state => state.pack);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        dispatch(getBackPack());
    }, [dispatch])

    const onProjectButtonClickt = (code) => {
        dispatch(deleteContainer({code:code}))
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
                        <div className="card-header d-flex justify-content-end  bg-transparent">
                            <button className='btn btn-sm btn-outline-danger' onClick={() =>    onProjectButtonClickt(container.code)}>del</button>
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
