import React, { useEffect, useState } from 'react'
import MediaUploadComponent from '../general/MediaUploadComponent'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slice/profileSlice';

export default function UpdateProfileComponent({ profile,setModal }) {
    const [updateprofile,setUpdateprofile] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        setUpdateprofile(profile)
    },[])

    const onCrateFormChange = (e) => {
        const { name, value } = e.target;
        setUpdateprofile(prev => ({...prev,[name]:value}))
    }

    const onUploadButtonClick = () => {
        dispatch(updateProfile(updateprofile)).unwrap().then((response) => {
            if (response.status !== "BAD_REQUEST") {
                setModal(prev => !prev)
            }
        })
    }

    return (
        <>
            <input className='form-control form-control-sm mb-3' placeholder='Name' type='text' defaultValue={profile.fullName} name='fullName' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' placeholder='Title' type='text' defaultValue={profile.title} name='title' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' placeholder='Bio' type='text' defaultValue={profile.bio} name='bio' onChange={onCrateFormChange} />
            <MediaUploadComponent setState={setUpdateprofile} type="profile" />
            <div className="container text-center pt-4 pb-4 profil-img" >
                <img src={updateprofile && updateprofile.mediaUrl ? updateprofile.mediaUrl : 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt='' style={{ width: '128px' }} />
            </div>
            <div className="row">
                <div className="col">
                <button className='btn btn-primary w-100' onClick={onUploadButtonClick}>Update</button>
                </div>
                <div className="col">
                <button className='btn btn-danger w-100' onClick={()=>setModal(prev=>!prev)}>Cancel</button>
                </div>
            </div>

        </>
    )
}
