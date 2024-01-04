import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
const Error = () => {
  const navigate = useNavigate()
  const err = useRouteError();
  const navigateHome = () => {
    navigate("/")
  }
  return (
    <div className='h-full mx-auto'>
      <h1>Oops!!!</h1>
      <h2> Something went wrong!!</h2>
      <h3>
        {err?.status}: {err?.statusText}
      </h3>
      <button className='p-2 rounded-lg text-white bg-blue-700 text-center' onClick={()=> navigateHome()}>Back to Home</button>
    </div>
  )
}

export default Error