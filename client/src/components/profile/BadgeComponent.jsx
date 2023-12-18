import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBadge, updateBadge } from '../../redux/slice/badgeSlice';
import { deleteBadgeOnContainer, updateBadgeOnContainer } from '../../redux/slice/packSlice';
import MediaUploadComponent from '../general/MediaUploadComponent';

export default function BadgeComponent({ badge, key }) {
    const styleName = { fontSize: "14px", fontWeight: 600, margin: "0px" }
    const styleDesc = { fontSize: "12px", fontWeight: 400 }
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const badgeresponse = useSelector(state => state.pack)
    const [newBadge, setNewBadge] = useState({
        name: null,
        description: null,
        owner: null,
        score: null,
        mediaUrl: null
    });

    useEffect(() => {
        setNewBadge(badge)
    }, [badge])

    const badgeDeleteButton = () => {
        dispatch(deleteBadge({ code: badge.code })).unwrap()
            .then((response) => {
                dispatch(deleteBadgeOnContainer(badge));
            })
    }

    const badgeSaveButton =  () => {
        dispatch(updateBadge(newBadge)).unwrap()
            .then((response) => {
                if (response.status !== "BAD_REQUEST") {
                    setEdit(prev => !prev)
                    dispatch(updateBadgeOnContainer(response))
                }
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
            <div className="col">
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

            <div className="col">
                <p className='display-6' style={styleName}><b>Score:</b> {badge.score}</p>
            </div>
        </>
    );

    const editable = (
        <div className="col">
            <div className="row">
                <div className="col">
                    <label className="input-group-text">Name</label>
                    <input className="form-control form-control-sm" type="text" defaultValue={badge.name} name="name" onChange={onFormChange} />
                    <label className="input-group-text">Description</label>
                    <input className="form-control form-control-sm" type="text" defaultValue={badge.description} name="description" onChange={onFormChange} />
                    <label className="input-group-text">Score</label>
                    <input className="form-control form-control-sm" type="text" defaultValue={badge.score} name="score" onChange={onFormChange} />
                    <label className="input-group-text">Media Url</label>
                    <MediaUploadComponent setState={setNewBadge} type="badges" />
                </div>
            </div>
            {badgeresponse.error &&
                <div className="row">
                    <div className="col">
                        <div className="alert alert-danger mt-4" >
                            {badgeresponse.error}
                        </div>
                    </div>
                </div>
            }
        </div>
    );


    return (
        <div className='row border align-items-center p-2 m-2' key={key}>
            {edit === false ? preview : editable}
            <div className="col d-flex justify-content-end">
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
    )
}
