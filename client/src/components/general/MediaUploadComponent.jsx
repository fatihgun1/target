import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {createMedia} from '../../redux/slice/mediaSlice'
export default function MediaUploadComponent({setState}) {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const response = useSelector(state => state.media)

    useEffect(()=> {
    
    },[dispatch])

    const onFileUpdate = (e) => {
        const { files } = e.target;
        if (files[0].size !== 0) {
            setFile(files[0])
        }
    }

    const onFileUpdoadButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('data', file);
        formData.append('type', 'badges');
        await dispatch(createMedia(formData)).unwrap().then((response) => {
            if(response){
                setState(prev => ({...prev,mediaUrl:response.url}))
            }

        });
    }

    return (
        <div>
            <form onSubmit={onFileUpdoadButtonClick}>
                <div class="input-group">
                    <input className="form-control form-control-sm" type="file" onChange={onFileUpdate} accept='.jpg,.jpeg,.png,.gif' />
                    <button className='btn btn-sm btn-secondary' disabled={response.loading} type='submit'>Upload</button>
                </div>
            </form>
            {response.media && 
            <div className='container text-center p-3 '>
                <img src={response.media.url} alt='' style={{height:"120px "}}/>
            </div>
            }
        </div>
    )
}