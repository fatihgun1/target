import React, { useEffect, useState } from 'react'
import { currentUser } from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import BadgeComponent from '../../components/profile/BadgeComponent';
export default function SettingsPage() {
  const distpatch = useDispatch();
  const cUser = useSelector(state => state.user)
  const [action,setAction] = useState(false);
  
  const [badge, setBadge] = useState({
    name: null,
    description: null,
    owner: null,
    score: null,
    mediaUrl: null
  });

  const [badgeList,setBadgeList] = useState([
    {
      name: null,
      description: null,
      owner: null,
      score: null,
      mediaUrl: null
    }
  ]);
  
  const [createBadge, setCreateBadge] = useState(false);
  useEffect(() => {
    distpatch(currentUser());
    listBadgeByOwner(cUser.user);
  },[createBadge,action]);


  let axiosConfig = {
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Method": "GET",
      'Authorization': `Bearer ${cUser.token}`
    }
  };

  const onCrateFormChange = (e) => {
    const { name, value } = e.target;
    setBadge(prev => ({ ...prev, [name]: value, owner: cUser.user }))
  }

  const onCrateBadgeButtonClick = async (e) => {
    await axios.post(`http://localhost:8080/badge/create`, badge, axiosConfig)
      .then((response) => {
        setCreateBadge(prev => !prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const listBadgeByOwner = async (owner) => {
    await axios.get(`http://localhost:8080/badge/all/${owner}`, null, axiosConfig)
    .then((response) => {
      setBadgeList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const createBadgeJsx = (
    <div className="row">
      <div className="col">
        <h5>Create Badge</h5>
        <input className='form-control form-control-sm mb-3' type='text' placeholder='Name' name='name' onChange={onCrateFormChange} />
        <input className='form-control form-control-sm mb-3' type='text' placeholder='Description' name='description' onChange={onCrateFormChange} />
        <input className='form-control form-control-sm mb-3' type='text' placeholder='Score' name='score' onChange={onCrateFormChange} />
        <input className='form-control form-control-sm mb-3' type='text' placeholder='image' name='mediaUrl' onChange={onCrateFormChange} />
        <div className="d-grid">
          <button className="btn btn-sm btn-primary" onClick={onCrateBadgeButtonClick}>Create Badge</button>
        </div>
      </div>
    </div>
  );

  const listBadgeJsx = (
    <div className='row'>
      <div className="col">
        {badgeList  !==null? 
          badgeList.map((source,index) => (
            <BadgeComponent badge={source} token={cUser.token} key={index} setAction={setAction}/>
          ))
        : null}
        
      </div>
    </div>
  );

  return (
    <div className='row'>
      <div className="col">
        <div className="row align-items-center">
          <div className="col">
            <p className="display-6">Badge</p>
          </div>
          <div className="col-2">
            <button className='btn btn-sm btn-outline-primary' onClick={() => setCreateBadge(prev => !prev)}>Create badge</button>
          </div>
        </div>
        <hr />
        {createBadge ? createBadgeJsx : listBadgeJsx}
      </div>

    </div>
  )
}
