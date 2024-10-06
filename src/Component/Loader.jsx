import React from 'react'
import { TailSpin } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div><TailSpin
    visible={true}
    height="80"
    width="80"
    color="#2f3031"
    ariaLabel="tail-spin-loading"
    radius="1" 
    wrapperStyle={{}}
    wrapperClass=""
    /></div>
  )
}

export default Loader