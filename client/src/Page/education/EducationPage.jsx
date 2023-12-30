import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEducations } from '../../redux/slice/educationSlice'
import EducationComponent from '../../components/education/EducationComponent'
import GeneralModal from '../../components/modal/GeneralModal';
import CreateEducationComponent from '../../components/education/CreateEducationComponent';

export default function EducationPage() {
    const dispatch = useDispatch();
    const responseeducation = useSelector((state) => state.education);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        async function fectEducation() {
            dispatch(getEducations())
        } 
        fectEducation();
    }, [])

    return (
        <div>

            <div className="row mb-4">
                <div className="col border-bottom mt-2 text-end ">
                    <GeneralModal modal={modal} setModal={setModal}>
                        <CreateEducationComponent setModal={setModal} />
                    </GeneralModal>
                    <button className='btn btn-sm btn-outline-danger mb-2' onClick={() => setModal(prev => !prev)}>Create Learing Path</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className='container'>
                        <div className="row row-cols-1 row-cols-md-3 g-3 ">
                            {responseeducation && responseeducation.educations && responseeducation.educations.map((education) => (
                                <EducationComponent education={education} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
