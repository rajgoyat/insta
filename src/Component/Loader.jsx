import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className='d-flex align-items-center justify-content-center'><RotatingLines
    visible={true}
    height="46"
    width="46"
    color="#c1c1c1"
    strokeColor='#c1c1c1'
    strokeWidth="5"
    animationDuration="0.2"
    ariaLabel="rotating-lines-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>
  )
}

export default Loader