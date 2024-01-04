import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    const navigateHome = () => {
        navigate("/")
    }
    return (
        <div className='mx-auto'>
            <h1 className='text-center'>Page Not Found</h1>
            <button className='p-2 rounded-lg text-white bg-blue-700 mx-auto' onClick={() => navigateHome()}>Back to Home</button>
        </div>
    )
}

export default Notfound