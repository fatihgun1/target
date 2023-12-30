import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSubjects, updateSubject, updateSubjectOnList } from '../../redux/slice/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import SubjectEntryComponent from '../../components/education/SubjectEntryComponent';
import YouTube from 'react-youtube';
import GeneralModal from '../../components/modal/GeneralModal';
import CreateSubjectComponent from '../../components/education/CreateSubjectComponent';

export default function SubjectPage() {
  const [current, setCurrent] = useState();
  const [modal, setModal] = useState(false);
  const [modified,setModifed] = useState(false);
  const dispatch = useDispatch();
  const { code } = useParams();
  const responsesubject = useSelector((state) => state.subject);

  useEffect(() => {
    async function fetchSubjects() {
      dispatch(getSubjects({ education: code }));
    }
    fetchSubjects();
    if (responsesubject && responsesubject.subjects && responsesubject.subjects.length == 0) {
      setCurrent(null)
    }
  }, [code,modified])

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
  const onVideoEnd = (event) => {
    if (event.data === 0) {
      dispatch(updateSubject({ code: current.code, completed: true })).unwrap().then((response) => {
        dispatch(updateSubjectOnList(response))
      })
    }
  };

  return (
    <div className='container m-4'>
      <GeneralModal modal={modal} setModal={setModal}>
        <CreateSubjectComponent setModal={setModal} education={code} />
      </GeneralModal>
      <button className='btn btn-sm btn-primary mb-4' onClick={() => setModal(prev => !prev)}>Create Lesson</button>
      {current &&
        <>
          <h4>{current && current.description}</h4>
          <hr />
        </>
      }
      <div className="row">
        {
          current &&
          <div className="col-sm-9 border-end pe-2 m-0 p-0">
            <YouTube videoId={current && current.youtubeVideoId} opts={opts} onReady={on_ready} onEnd={onVideoEnd} />
          </div>
        }

        <div className="col">
          {responsesubject && responsesubject.subjects && responsesubject.subjects.map((subject) => (
            <SubjectEntryComponent subject={subject} setCurrent={setCurrent} selected={subject && current && subject.code === current.code} setModifed={setModifed} />
          ))}
        </div>
      </div>

    </div>
  )
}
