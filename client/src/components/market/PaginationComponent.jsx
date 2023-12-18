import React from 'react'

export default function PaginationComponent({ totalPage, currentPage, setPage }) {
  const generateArray = (aroundNumber) => [...Array(aroundNumber).keys()].map(i => i + 1);


  const onPageNumberClick = (num) => {
    setPage(prev => ({ ...prev, current: num - 1 }))
  }

  return (

    <div className="btn-group">
      {generateArray(totalPage).map((num, index) => (
        <div key={index} className={num === currentPage + 1 ? "btn btn-primary active" : "btn btn-outline-primary"} onClick={() => onPageNumberClick(num)}>{num}</div>
      ))}
    </div>
  )
}
