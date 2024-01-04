import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const AppLayout = () => {
  return (
    <div className='bg-white shadow-xl p-0 sm:p-4 lg:p-6 w-10/12 sm:w-6/12 lg:w-4/12 mx-auto max-h-[650px] overflow-y-auto my-4'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default AppLayout