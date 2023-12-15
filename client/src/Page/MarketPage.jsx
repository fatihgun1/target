import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMarket } from '../redux/slice/marketSilce';
import MarketEntryModel from '../components/market/MarketEntryModel';
import PaginationComponent from '../components/market/PaginationComponent';

export default function MarketPage() {
  const  [page,setPage] = useState( {
    current: "0",
    pageSize: "6"
  });

  const marketresponse = useSelector(state => state.market)
  const dispatch = useDispatch();
  useEffect(() => {
    const market = () => {
      dispatch(getMarket(page))
    }
    market();
  }, [dispatch,page])
  return (
    <div className='container'>
      <div className="display-6">Market</div>
      <hr/>
      {marketresponse.market && marketresponse.market.entries && marketresponse.market.entries.map((container, index) => (
        <MarketEntryModel container={container} key={index}/>
      ))}

    <div>
      <PaginationComponent 
      totalPage={marketresponse && marketresponse.market.totalPage} 
      currentPage={marketresponse && marketresponse.market.currentPage} 
      setPage={setPage}/>
    </div>
    </div>
  )
}
