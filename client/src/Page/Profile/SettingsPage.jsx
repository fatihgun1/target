import React, { useEffect, useState } from 'react'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import BadgeComponent from '../../components/profile/BadgeComponent';
import { createBadge, getBadgesByUser } from '../../redux/slice/badgeSlice';
import GeneralModal from '../../components/modal/GeneralModal';
import MediaUploadComponent from '../../components/general/MediaUploadComponent';

export default function SettingsPage() {
  const distpatch = useDispatch();
  const cUser = useSelector(state => state.user)
  const badgeresponse = useSelector(state => state.badge)
  const [action, setAction] = useState(false);
  const [modal, setModal] = useState(false);
  const [badge, setBadge] = useState({
    name: null,
    description: null,
    owner: null,
    score: null,
    mediaUrl: null
  });

  useEffect(() => {
    distpatch(currentUser());
    distpatch(getBadgesByUser());
  }, [distpatch, modal, action]);

  const onCrateFormChange = (e) => {
    const { name, value } = e.target;
    setBadge(prev => ({ ...prev, [name]: value, owner: cUser.user }))
  }

  const onCrateBadgeButtonClick = async (e) => {
    distpatch(createBadge(badge)).unwrap()
      .then((response) => {
        if (response.status !== "BAD_REQUEST") {
          setModal(prev => !prev)
          setBadge({name: null,description: null,score: null,mediaUrl: null})
        }
      });
  }

  return (
    <div className='row'>
      <div className="col">
        <div className="row align-items-center">
          <div className="col">
            <p className="display-6">Badge</p>
          </div>
          <div className="col-2">
            <button className='btn btn-sm btn-outline-primary' onClick={() => setModal(prev => !prev)}>Create badge</button>
          </div>
        </div>
      </div>
      <hr />
      <GeneralModal modal={modal} setModal={setModal} width='500px'>
        <div className="row">
          <div className="col">
            <h5>Create Badge</h5>
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Name' name='name' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Description' name='description' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Score' name='score' onChange={onCrateFormChange} />
            <MediaUploadComponent setState={setBadge}/>
            <div className="d-grid">
              <button className="btn btn-sm btn-primary" onClick={onCrateBadgeButtonClick}>Create Badge</button>
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
        </div>
      </GeneralModal>
      <div className="row">
        <div className="col">
          <div className='row'>
            <div className="col">
              {badgeresponse.badges &&
                badgeresponse.badges.map((source, index) => (
                  <BadgeComponent badge={source} token={cUser.token} key={index} setAction={setAction} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
