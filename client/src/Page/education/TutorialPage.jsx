import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import SubjectEntryComponent from '../../components/education/SubjectEntryComponent';

export default function TutorialPage() {
    const code = useParams();
    const dispatch = useDispatch();
    const responsesubject = useSelector((state) => state.subject)
    const [current, setCurrent] = useState();
    const opts = {
        height: '480',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    const on_ready = (e) => {
        e.target.pauseVideo();
    }
    useEffect(() => {
    }, [code,dispatch])
    return (
        <div className='container p-3'>
            <h4>{current && current.description}</h4>
            <hr />

            <div className="row">
                <div className="col-sm-9 border m-0 p-0">
                    <YouTube videoId={current && current.youtubeVideoId} opts={opts} onReady={on_ready} />
                </div>
                <div className="col border">
                    {responsesubject && responsesubject.subjects && responsesubject.subjects.map((subject) => (
                        <SubjectEntryComponent subject={subject} />
                    ))}
                </div>
            </div>
        </div>
    )
}
