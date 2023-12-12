import React, { useEffect, useState } from 'react'
import AchievementComponent from '../../components/profile/AchievementComponent'
import { useDispatch, useSelector } from 'react-redux';
import ProfileNavbar from '../../components/profile/ProfileNavbar';
import ProfileDetailComponent from '../../components/profile/ProfileDetailComponent';
import { getAchievemnetByUser } from '../../redux/slice/achievementSlice';
import { getProfile } from '../../redux/slice/profileSlice';
import BackpackComponent from '../../components/profile/BackpackComponent';
export default function ProfilePage() {
  const dispatch = useDispatch();
  const cUser = useSelector(state => state.user);
  const achievementresponse = useSelector(state => state.achievement);
  const [action, setAction] = useState(false)
  const [tabs, setTabs] = useState({
    achievement: true,
    backpack: false
  })

  useEffect(() => {
    dispatch(getAchievemnetByUser())
    dispatch(getProfile())
  }, [dispatch, action]);


  return (
    <div className='container'>
      <div className="row m-0 p-0">
        <div className="col m-0 p-0">
          <ProfileNavbar />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <ProfileDetailComponent />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <div className={tabs.achievement ? 'nav-link active' : 'nav-link '} onClick={() => setTabs({ achievement: true, backpack: false })}>Achievement</div>
            </li>
            <li className="nav-item">
              <div className={tabs.backpack ? 'nav-link active' : 'nav-link '} onClick={() => setTabs({ achievement: false, backpack: true })}>Backpack</div>
            </li>
          </ul>
        </div>
      </div>
      {tabs.achievement &&
        <div className="row">
          <div className="col">
            <div className="row row-cols-1 row-cols-lg-3 g-2">
              {achievementresponse.achievements && achievementresponse.achievements.map((achievement, index) => (
                <AchievementComponent achievement={achievement} key={index} token={cUser.token} setAction={setAction} />
              ))}
            </div>
          </div>
        </div>
      }

      {tabs.backpack && <BackpackComponent />}

    </div>
  )
}
