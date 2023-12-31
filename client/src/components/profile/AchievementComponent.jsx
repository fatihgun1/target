import React, { useEffect, useState } from 'react'
import trophy from '../../assets/img/trophy.png'
import ReactModal from 'react-modal'
import SimpleBadgeComponent from './SimpleBadgeComponent';

export default function AchievementComponent({ achievement, key }) {
    const [modal, setModal] = useState(false);
    useEffect(() => {

    }, [achievement]);


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
        <div className="col" key={key}>
            {badge}
            <div className='card' >
                <div className="card-body text-center">
                    <div className="row align-items-center mb-3">
                        <div className="col-4">
                            <img src={trophy} alt='' className='card-img-top' />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <p className='h5 d-inline'>Target </p>
                                            <p className='lead d-inline' style={ {wordWrap: "break-word"}}>
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
                        <div className="col ">
                            <button className='btn btn-sm btn-primary w-100 m-0 p-0' onClick={() => setModal(prev => !prev)}>Reward</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
