import React, { useState } from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteSubject, deleteSubjectOnList } from '../../redux/slice/subjectSlice';

export default function SubjectEntryComponent({ subject, setCurrent, selected, setModifed }) {
    const [onDeleteClick, setOnDeleteClick] = useState(false);
    const dispatch = useDispatch();
    const onDeleteIconClick = () => {
        setOnDeleteClick(true)
        dispatch(deleteSubject({ code: subject.code })).unwrap().then((response) => {
            dispatch(deleteSubjectOnList({ code: subject.code }))
            setModifed(prev => !prev)
        })
        setOnDeleteClick(false)
    }
    return (
        <div className="row icon-right mb-1" onClick={() => { onDeleteClick === false && setCurrent(subject) }} key={subject.code}>
            <div className={selected ? 'col border-bottom bg-secondary-subtle' : 'col border-bottom'}>
                <div className="row">
                    <div className="col text-start">
                    <MdOutlineCastForEducation className='me-4' size='32px' />
                    {subject.description}
                    </div>
                    <div className="col text-end">
                        {subject.completed && <GoThumbsup color='green' />}
                        <RiDeleteBin2Fill color='red' onClick={onDeleteIconClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}
