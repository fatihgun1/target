import React, { useEffect, useState } from 'react'
import AchievementComponent from '../../components/profile/AchievementComponent'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/slice/userSlice';
import axios from 'axios';
import ProfileNavbar from '../../components/profile/ProfileNavbar';
import ProfileDetailComponent from '../../components/profile/ProfileDetailComponent';
export default function ProfilePage() {
  const dispatch = useDispatch();
  const cUser = useSelector(state => state.user);
  const [achievements, setAchievements] = useState([{ name: null, totalScore: null }])
  useEffect(() => {
    dispatch(currentUser());
    getAchievement(cUser.user)
  }, []);

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


  const getAchievement = async (user) => {
    await axios.get(`http://localhost:8080/achievement/all/${user}`, null, axiosConfig)
      .then((response) => {
        setAchievements(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


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
            {achievements && achievements.map((achievement, index) => (
              <AchievementComponent achievement={achievement} key={index} token={cUser.token} />
            ))}
          </div>
        </div>
      </div>



    </div>
  )
}
