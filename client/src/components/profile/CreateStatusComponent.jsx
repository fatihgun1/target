import React, { useEffect, useState } from 'react'
import GeneralModal from '../modal/GeneralModal'
import { createStatus } from '../../redux/slice/statusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusToContainer } from '../../redux/slice/packSlice';

export default function CreateStatusComponent({ code }) {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const statusresponse = useSelector(state => state.status);
    const [status, setStatus] = useState({ container: code, name: null, score: null });

    useEffect(() => {
        setStatus({ container: code })
    }, [modal]);

    const onCreateStatusFormChange = (e) => {
        const { name, value } = e.target;
        setStatus(prev => ({ ...prev, [name]: value }))
    }

    const createNewStatus = async () => {
        await dispatch(createStatus(status)).unwrap().then((response) => {
            if (response.status !== "BAD_REQUEST") {

                dispatch(setStatusToContainer(response));
                setModal(prev => !prev)
                setStatus({ name: null, score: null });
            }
        })
    }

    return (
        <div>
            <GeneralModal modal={modal} setModal={setModal}>
                <div className='container'>
                    <input className="form-control form-control-sm mb-2" type="text" name='name' placeholder="Name" onChange={onCreateStatusFormChange} />
                    <input className="form-control form-control-sm mb-2" type="text" name='score' placeholder="Score" onChange={onCreateStatusFormChange} />
                    <div className="d-grid">
                        <button className="btn btn-sm btn-primary" type="button" onClick={createNewStatus}>create</button>
                    </div>
                    {statusresponse.error &&
                        <div className="alert alert-danger mt-4" >
                            {statusresponse.error}
                        </div>
                    }
                </div>
            </GeneralModal>
            <button className='btn btn-sm btn-outline-primary' onClick={() => setModal(prev => !prev)}>Create Status</button>
        </div>
    )
}
