import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createBadge } from '../../redux/slice/badgeSlice';
import GeneralModal from '../modal/GeneralModal';
import MediaUploadComponent from '../general/MediaUploadComponent';
import { setBadgeToContainer } from '../../redux/slice/packSlice';

export default function CreateBadgeComponent({ code }) {
  const [modal, setModal] = useState(false);
  const distpatch = useDispatch();
  const [err,setErr] = useState();
  const [badge, setBadge] = useState({
    name: null,
    description: null,
    container: code,
    score: null,
    mediaUrl: null
  });

  useEffect(() => {
    setBadge({ container: code })
    setErr(null)
  }, [modal]);

  const onCrateFormChange = (e) => {
    const { name, value } = e.target;
    setBadge(prev => ({ ...prev, [name]: value }))
  }

  const onCrateBadgeButtonClick = () => {

    distpatch(createBadge(badge)).unwrap()
      .then((response) => {
        if (response.status !== "BAD_REQUEST") {
          setModal(prev => !prev)
          distpatch(setBadgeToContainer(response));
          setBadge({ name: null, description: null, score: null, mediaUrl: null })
        }else{
          setErr(response.message)
        }
      });
  }

  return (
    <>
      <GeneralModal modal={modal} setModal={setModal} width='500px'>
        <div className="row">
          <div className="col">
            <h5>Create Badge</h5>
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Name' name='name' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Description' name='description' onChange={onCrateFormChange} />
            <input className='form-control form-control-sm mb-3' type='text' placeholder='Score' name='score' onChange={onCrateFormChange} />
            <MediaUploadComponent setState={setBadge} type="badges" />
            <div className="d-grid">
              <button className="btn btn-sm btn-primary" onClick={onCrateBadgeButtonClick}>Create Badge</button>
            </div>
            {err &&
              <div className="row">
                <div className="col">
                  <div className="alert alert-danger mt-4" >
                    {err}
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
      </GeneralModal>
      <button className='btn btn-sm btn-outline-primary' onClick={() => setModal(prev => !prev)}>Create badge</button>
    </>
  )
}
