import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';
import { deleteStatus, updateStatus } from '../../redux/slice/statusSlice';
export default function StatusCompont({ status, setAction ,key }) {

    const [edit, setEdit] = useState(false);
    const [statu, setStatu] = useState(status)
    const dispatch = useDispatch();

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
        .then((response)=>{
            setAction(prev => !prev)
            setEdit(prev => !prev)
        }).catch((err)=>{
            console.log(err)
        });
    }

    const deleteExistedStatus = async () =>{
        await dispatch(deleteStatus({code:status.code})).unwrap()
        .then((response) => {
            setAction(prev => !prev)
            setEdit(prev => !prev)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const previewStatus = (
        <div className="row m-0">
            <div className="col-10">
                {status.name} - {status.score}
            </div>
            <div className="col">
                <div className="input-group">
                    <button className='btn btn-sm btn-primary' onClick={onStatusEdit}>Edit</button>
                    <button className='btn btn-sm btn-danger' onClick={deleteExistedStatus}>Delete</button>
                </div>
            </div>
        </div>
    );

    const editStatus = (
        <div className="row m-0">
            <div className="col-10">
                <div className="row">
                    <div className="col">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input className="form-control form-control-sm" type="text" defaultValue={status.name} name="name" onChange={onStatusNameChage} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Score</span>
                            </div>
                            <input className="form-control form-control-sm" type="text" defaultValue={status.score} name="score" onChange={onStatusScoreChage} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="input-group">
                    <button className='btn btn-sm btn-danger' onClick={onStatusEdit}>Cancel</button>
                    <button className='btn btn-sm btn-success' onClick={saveStatus}>Save</button>
                </div>
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
