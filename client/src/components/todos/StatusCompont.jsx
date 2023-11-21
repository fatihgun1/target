import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function StatusCompont({ status, setAction, token,key }) {

    const [edit, setEdit] = useState(false);
    const [statu, setStatu] = useState(status)

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

    let axiosConfig = {
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Method": "GET",
            'Authorization': `Bearer ${token}`
        }
    };

    const saveStatus = async (e) => {
        await axios.post(`http://localhost:8080/status/update `, statu, axiosConfig)
            .then((response) => {
                setAction(prev => !prev)
                setEdit(prev => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteStatus = async () =>{
        await axios.post(`http://localhost:8080/status/delete `, {code:status.code}, axiosConfig)
        .then((response) => {
            setAction(prev => !prev)
            setEdit(prev => !prev)
        })
        .catch((error) => {
            console.log(error)
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
                    <button className='btn btn-sm btn-danger' onClick={deleteStatus}>Delete</button>
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
