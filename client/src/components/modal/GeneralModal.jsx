import React from 'react'
import ReactModal from 'react-modal';
export default function GeneralModal({ children , modal, setModal,width,height}) {
    ReactModal.setAppElement('#root');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            overflow: 'scroll',
            width:width,
            height: height,
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <ReactModal isOpen={modal} onRequestClose={() => setModal(prev => !prev)} style={customStyles}>
            <button className='btn btn-close' onClick={() => setModal(prev => !prev)}></button>
            <div className="container p-4">
                {children}
            </div>
        </ReactModal>
    )
}
