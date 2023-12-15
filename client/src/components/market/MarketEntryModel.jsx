import React, { useState } from 'react'
import GeneralModal from '../modal/GeneralModal'
import MarketEntryPopup from './MarketEntryPopup';
import { useDispatch } from 'react-redux';
import { buyContainer } from '../../redux/slice/marketSilce';

export default function MarketEntryModel({ container, key }) {

    const [modal, setModal] = useState(false);
    const [buy, setBuy] = useState();
    const dispatch = useDispatch();

    const onBuyButtonClick = (code) => {
        setBuy({ code: code })
        dispatch(buyContainer(buy))
    }

    return (
        <>
            <GeneralModal modal={modal} setModal={setModal} width='1200px'>
                <MarketEntryPopup container={container} />
            </GeneralModal>

            <div className='card mb-1 text-center' key={key} >
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col d-flex justify-content-start">
                            {container.name && <> <b>Name :</b> {container.name}</>}
                        </div>
                        <div className='col'>
                            {container.owner && <> owner: {container.owner}</>}
                        </div>
                        <div className="col d-flex justify-content-end">
                            <button className='btn btn-warning me-2' onClick={() => setModal(prev => !prev)}>Show Detail</button>
                            <button className='btn btn-primary' onClick={() => onBuyButtonClick(container.code)}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
