import React, { useState } from 'react'
import GeneralModal from '../modal/GeneralModal'
import MarketEntryPopup from './MarketEntryPopup';
import { useDispatch, useSelector } from 'react-redux';
import { buyContainer } from '../../redux/slice/marketSilce';

export default function MarketEntryModel({ container, index }) {
    const marketresponse = useSelector(state => state.market)
    const [modal, setModal] = useState(false);
    const [buy, setBuy] = useState();
    const dispatch = useDispatch();

    const onBuyButtonClick = (code) => {
        setBuy({ code: code });
        dispatch(buyContainer(buy));
    }

    return (
        <div key={index} >
            <GeneralModal modal={modal} setModal={setModal} width='1200px' height='450px'>
                <MarketEntryPopup container={container}  />
            </GeneralModal>

            <div className='card mb-1 text-center'  key={index}>
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
                            <button className={marketresponse.loading ? 'btn btn-danger' : 'btn btn-primary' } onClick={() => onBuyButtonClick(container.code)}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
