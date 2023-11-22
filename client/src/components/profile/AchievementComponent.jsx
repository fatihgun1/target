import React, { useState } from 'react'
import trophy from '../../assets/img/trophy.png'
import ReactModal from 'react-modal'
import SimpleBadgeComponent from './SimpleBadgeComponent';
import axios from 'axios';
export default function AchievementComponent({ achievement, key, token }) {
    const [modal, setModal] = useState(false);

    const [achieve,setAchieve] = useState(achievement)

    let axiosConfig = {
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };

    const calculateScore = async () => {
        await axios.post(`http://localhost:8080/achievement/calculate`, { code: achievement.code }, axiosConfig)
            .then((response) => {
                 const res = response.data.totalScore;
                setAchieve(prev => ({...prev,totalScore:res }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '500px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const badge = (
        <ReactModal isOpen={modal} onRequestClose={() => setModal(prev => !prev)} style={customStyles}>
            <button className='btn btn-close' onClick={() => setModal(prev => !prev)}></button>
            <div className="container p-3">
                {achievement.badges && achievement.badges.map((badge, index) => (
                    <div className={badge.isDeserved ? "row border mb-2" : "row border mb-2 opacity-25"}>
                        <SimpleBadgeComponent badge={badge} key={index} />
                    </div>
                ))}
            </div>
        </ReactModal>
    );

    return (
        <div className="col">
            <div className='card' style={{ width: '250px' }} key={key}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <img src={trophy} alt='' className='card-img-top' />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <p className='h5 d-inline'>Target </p>
                                            <p className='lead d-inline'>
                                                {achievement.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p className='h5 d-inline'>Score </p>
                                    <p className='lead d-inline'>{achievement.totalScore}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <span>
                                <button className='btn btn-sm btn-primary' onClick={() => setModal(prev => !prev)}>reward</button>
                            </span>
                            <span>
                                <button className='btn btn-sm btn-primary' onClick={calculateScore}>Calculate</button>
                            </span>
                        </div>

                        {badge}
                    </div>
                </div>
            </div>
        </div>
    )
}
