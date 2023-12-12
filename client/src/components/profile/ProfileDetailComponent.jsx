import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import GeneralModal from '../modal/GeneralModal'
import UpdateProfileComponent from './UpdateProfileComponent';

export default function ProfileDetailComponent() {

  const profileresponse = useSelector(state => state.profile);

  const [modal, setModal] = useState(false);

  return (
    <div className="container">
      <GeneralModal modal={modal} setModal={setModal}>
        <UpdateProfileComponent profile={profileresponse.profile} setModal={setModal}/>
      </GeneralModal>
      <div className='row border p-2'>
        <div className="col-3">
          <img className='mb-3 profil-img' src={profileresponse.profile.mediaUrl ? profileresponse.profile.mediaUrl : 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt='' />
          <p className="m-0 p-0" style={{ fontSize: "12px", fontWeight: 400 }}><strong>Name : </strong>{profileresponse.profile.fullName}</p>
          <p className="m-0 p-0" style={{ fontSize: "12px", fontWeight: 400 }}><strong>Title : </strong>{profileresponse.profile.title} </p>
          <p className="m-0 p-0" style={{ fontSize: "12px", fontWeight: 400 }}><strong>Score : </strong>{profileresponse.profile.profileScore}</p>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">   
            <p className='p-0 m-0' style={{ fontSize: "16px", fontWeight: 600 }}>Bio</p>
            </div>
            <div className="col-3">
              <button className='btn btn-sm btn-outline-primary' onClick={()=> setModal(prev => !prev)}>Update Profile</button>
            </div>
          </div>
          <hr />
          {profileresponse.profile.bio ?
            <p style={{ fontSize: "12px", fontWeight: 400, wordWrap: true }}>
              {profileresponse.profile.bio}
            </p>
            : <>You should type your bio</>
          }
        </div>
      </div>
    </div>

  )
}
