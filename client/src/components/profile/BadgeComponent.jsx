import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function BadgeComponent({ badge, key ,token ,setAction}) {
    const styleName = { fontSize: "24px", fontWeight: 400, margin: "0px" }
    const styleDesc = { fontSize: "12px", fontWeight: 400 }
    const [edit, setEdit] = useState(false);

    const [newBadge, setNewBadge] = useState({
        name: null,
        description: null,
        owner: null,
        score: null,
        mediaUrl: null
    });

    useEffect(() => {
        setNewBadge(badge)
    }, [edit])

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

    const badgeDeleteButton = async () => {
        await axios.post(`http://localhost:8080/badge/delete`, {code:badge.code}, axiosConfig)
        .then((response) => {
          setEdit(prev => !prev)
          setAction(prev => !prev)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const badgeSaveButton = async () => {
        await axios.post(`http://localhost:8080/badge/update`, newBadge, axiosConfig)
      .then((response) => {
        setEdit(prev => !prev)
        setAction(prev => !prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setNewBadge(prev => ({ ...prev, [name]: value }))
    }


    const preview = (
        <>
            <div className="col-2">
                <img src={badge.mediaUrl} alt={badge.name} style={{ width: "64px" }} />
            </div>
            <div className="col">
                <div className="row">
                    <div className="col">
                        <p className='display-6' style={styleName}>{badge.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong style={styleDesc}>{badge.description}</strong>
                    </div>
                </div>
            </div>

            <div className="col ">
                <p className='display-6' style={styleName}><b>Score:</b> {badge.score}</p>
            </div>
        </>
    );

    const editable = (
        <div className="col">
            <div className="row">
                <div className="col-4">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Name</span>
                        </div>
                        <input className="form-control form-control-sm" type="text" defaultValue={badge.name} name="name" onChange={onFormChange} />
                    </div>
                </div>
                <div className="col">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Description</span>
                        </div>
                        <input className="form-control form-control-sm" type="text" defaultValue={badge.description} name="description" onChange={onFormChange} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Score</span>
                        </div>
                        <input className="form-control form-control-sm" type="text" defaultValue={badge.score} name="score" onChange={onFormChange} />
                    </div>
                </div>
                <div className="col">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Media Url</span>
                        </div>
                        <input className="form-control form-control-sm" type="text" defaultValue={badge.mediaUrl} name="mediaUrl" onChange={onFormChange} />
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className='row border align-items-center p-2 m-2' key={key}>
            {edit === false ? preview : editable}
            <div className="col-2">

                <div className="input-group">
                    {edit === true ?
                        <>
                            <button className='btn btn-sm btn-primary' onClick={() => setEdit(prev => !prev)}>Cancel</button>
                            <button className='btn btn-sm btn-success' onClick={badgeSaveButton}>Save</button></>
                        :
                        <>
                            <button className='btn btn-sm btn-primary' onClick={() => setEdit(prev => !prev)}>Edit</button>
                            <button className='btn btn-sm btn-danger' onClick={badgeDeleteButton}>Delete</button>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}
