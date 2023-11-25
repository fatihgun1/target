import React, { useEffect, useState } from 'react'
import AchievementComponent from '../../components/profile/AchievementComponent'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import ProfileNavbar from '../../components/profile/ProfileNavbar';
import ProfileDetailComponent from '../../components/profile/ProfileDetailComponent';
import { getAchievemnetByUser } from '../../redux/slice/achievementSlice';
export default function ProfilePage() {
  const dispatch = useDispatch();
  const cUser = useSelector(state => state.user);
  const achievementresponse = useSelector(state => state.achievement);
  const [action,setAction] = useState(false)
  useEffect(() => {
    dispatch(currentUser());
    dispatch(getAchievemnetByUser())
  }, [dispatch,action]);

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
      <div className="row">
        <div className="col">
          <div className="row row-cols-1 row-cols-md-3 g-4">
       
            {achievementresponse.achievements && achievementresponse.achievements.map((achievement, index) => (
              <AchievementComponent achievement={achievement} key={index} token={cUser.token} setAction={setAction}/>
            ))}
          </div>
        </div>
      </div>



    </div>
  )
}
