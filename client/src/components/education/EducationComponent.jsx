import React, { useState } from 'react'
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEducation, deleteEducationOnList, updateEducation, updateEducationOnList } from '../../redux/slice/educationSlice';
export default function EducationComponent({ education }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [editedEducation,setEditedEducation] = useState(()=>education)
    const onDeleteButtonClick = (code) => {
        dispatch(deleteEducation({ code: code })).unwrap().then((response) => {
            if (response) {
                dispatch(deleteEducationOnList({ code: code }))
            }
        })
    }
    const onFormChange = e => {
        const { name, value } = e.target;
        setEditedEducation(prev => ({ ...prev, [name]: value }))
      }
    
    const onUpdateButtonClick = () => {
        dispatch(updateEducation(editedEducation)).unwrap().then((response)=>{
            dispatch(updateEducationOnList(response));
            setEdit(prev =>!prev)
        })
    }

    return (
        <div className="col">
            <div className='card mb-2' key={education.code}>
                <div className="card-header bg-transparent text-end border-0">
                    <FaPen className='icon-right ' color='gray' onClick={() => setEdit(prev => !prev)} />
                    <MdDelete className='icon-right' color='red' size='24px' onClick={() => onDeleteButtonClick(education.code)} />
                </div>
                <div className="card-body onHover text-center" onClick={() => { if (edit === false) { navigate(`/learning/${education.code}`) } }}>
                    {edit ?
                        <div className="row">
                            <div className="col-8 p-0 m-0">
                                <input name='name' className='form-control w-100' type='text' defaultValue={education.name} onChange={onFormChange} />
                            </div>
                            <div className="col p-0 m-0">
                                <button className='btn btn-success' onClick={onUpdateButtonClick}>Update</button>
                            </div>
                        </div>

                        :
                        <>{education.name}</>
                    }

                </div>
            </div>
        </div>
    )
}
