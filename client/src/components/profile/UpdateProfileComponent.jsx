import React, { useState } from 'react'
import MediaUploadComponent from '../general/MediaUploadComponent'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slice/profileSlice';

export default function UpdateProfileComponent({ profile, setModal }) {
    const [profileObject, setProfileObject] = useState(() => profile);
    const dispatch = useDispatch();

    const onCrateFormChange = (e) => {
        const { name, value } = e.target;
        setProfileObject(prev => ({ ...prev, [name]: value }))
    }

    const onUploadButtonClick = () => {
        let x = JSON.parse(JSON.stringify(profileObject))
        dispatch(updateProfile(x)).unwrap().then((response) => {
            if (response && response.status !== "BAD_REQUEST") {
                setModal(prev => !prev)
            }
        });
    }

    return (
        <div className='container'>
            <img src={profileObject && profileObject.mediaUrl ? profileObject.mediaUrl : 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt='' style={{ width: '128px' }} />
            <div className="row">
                <div className="col">
                    <input className='form-control form-control-sm mb-3' placeholder='Name' type='text' defaultValue={profileObject.fullName} name='fullName' onChange={onCrateFormChange} />
                    <input className='form-control form-control-sm mb-3' placeholder='Title' type='text' defaultValue={profileObject.title} name='title' onChange={onCrateFormChange} />
                    <input className='form-control form-control-sm mb-3' placeholder='Bio' type='text' defaultValue={profileObject.bio} name='bio' onChange={onCrateFormChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <MediaUploadComponent setState={setProfileObject} type="profile" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className='btn btn-primary w-100' onClick={onUploadButtonClick}>Update</button>
                </div>
                <div className="col">
                    <button className='btn btn-danger w-100' onClick={() => setModal(prev => !prev)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
