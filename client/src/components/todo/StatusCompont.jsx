import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteStatus, updateStatus } from '../../redux/slice/statusSlice';
import { deleteStatusOnContainer } from '../../redux/slice/packSlice';
export default function StatusCompont({ status, key }) {

    const [edit, setEdit] = useState(false);
    const [statu, setStatu] = useState(status)
    const dispatch = useDispatch();
    const statusresponse = useSelector(state => state.status)
    useEffect(() => {
        setStatu(status)
    }, [status])

    const onStatusEdit = () => {
        setEdit(prev => !prev)
        setStatu(status)
    }

    const onStatusNameChage = (e) => {
        const { name, value } = e.target;
        setStatu(prev => ({ ...prev, [name]: value }))
    }

    const onStatusScoreChage = (e) => {
        const { name, value } = e.target;
        setStatu(prev => ({ ...prev, [name]: value }))
    }

    const saveStatus = async (e) => {
        dispatch(updateStatus(statu)).unwrap()
            .then((response) => {
                if (response.status !== "BAD_REQUEST") {
                    setEdit(prev => !prev)
                }
            })
    }

    const deleteExistedStatus = async () => {
        await dispatch(deleteStatus({ code: status.code })).unwrap()
            .then((response) => {
                dispatch(deleteStatusOnContainer(status))
            })
    }

    const previewStatus = (
        <div className="row">
            <div className="col">
                {status.name} - {status.score}
            </div>
            <div className="col d-flex justify-content-end">
                <button className='btn btn-sm btn-primary' onClick={onStatusEdit}>Edit</button>
                <button className='btn btn-sm btn-danger' onClick={deleteExistedStatus}>Delete</button>
            </div>
        </div>
    );

    const editStatus = (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <input className="form-control form-control-sm" type="text" defaultValue={status.name} name="name" onChange={onStatusNameChage} />
                    </div>
                    <div className="col">
                        <input className="form-control form-control-sm" type="text" defaultValue={status.score} name="score" onChange={onStatusScoreChage} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {statusresponse.error &&
                            <div className="alert alert-danger" >
                                {statusresponse.error}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <button className='btn btn-sm btn-danger' onClick={onStatusEdit}>Cancel</button>
                <button className='btn btn-sm btn-success' onClick={saveStatus}>Save</button>
            </div>
        </div>
    );

    return (
        <div className='card mb-2' key={key}>
            <div className="card-body">
                {edit ? editStatus : previewStatus}
            </div>
        </div>
    )
}
