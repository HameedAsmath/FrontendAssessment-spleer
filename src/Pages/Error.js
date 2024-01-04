import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
const Error = () => {
  const navigate = useNavigate()
  const err = useRouteError();
  console.log(err)
  const navigateHome = () => {
    navigate("/")
  }
  return (
    <div className=' h-screen flex flex-col justify-center items-center'>
      <h1>Oops!!!</h1>
      <h2> Something went wrong!!</h2>
      <button className='mt-2 p-2 rounded-lg text-white bg-blue-700 text-center' onClick={()=> navigateHome()}>Back to Home</button>
    </div>
  )
}

export default Error