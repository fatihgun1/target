import React from 'react'

export default function MarketEntryPopup({ container , key}) {
    return (
        <div className='row' key={key}>
            <div className="col">
                <div className="display-6">Status</div>
                <hr/>
                {container && container.status && container.status.map((status, index) => (
                    <div className="card mb-2">
                        <div className="card-body p-0 m-0 ms-4">
                            <strong>name : </strong>{status.name} | <strong>score : </strong>{status.score}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col">
            <div className="display-6">Badge</div>
                <hr/>
                {container && container.badges && container.badges.map((badge, index) => (
                    <div className="card mb-2 ">
                        <div className="card-body p-0 m-0 ms-4">
                            <div className="row">
                                <div className="col">
                                    <img src={badge.mediaUrl} alt='' style={{width:'64px'}}/>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <strong>Name: </strong> {badge.name}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                           <strong>Description: </strong> {badge.description}
                                        </div>
                                    </div>
                                </div>

                                <div className='col'>
                                <strong>Score :</strong> {badge.score}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
