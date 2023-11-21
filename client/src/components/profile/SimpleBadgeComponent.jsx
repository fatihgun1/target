import React from 'react'

export default function SimpleBadgeComponent({ badge, key }) {
    const styleName = { fontSize: "16px", fontWeight: 600, margin: "0px" }
    const styleDesc = { fontSize: "12px", fontWeight: 400 }
    return (
        <div key={key}>
            <div className="row ">
                <div className="col-2">
                    <img src={badge.mediaUrl} alt={badge.name} style={{ width: "64px" }} className=' rounded' />
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <p className='display-6' style={styleName}>{badge.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <strong style={styleDesc}>{badge.description}</strong>
                        </div>
                    </div>
                </div>

                <div className="col ">
                    <p className='display-6' style={styleName}><b>Score:</b> {badge.score}</p>
                </div>
            </div>
        </div>
    )
}
