import React, { useEffect, useState } from 'react'
import profileImg from "../assets/profile.png"
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../Utils/constants'
import ShimmerCard from '../components/Shimmer'

const ContactDetails = () => {
  const [contactDetail, setContactDetail] = useState()
  const controller = new AbortController();
  const { signal } = controller;
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const { id } = useParams()
  console.log(id)
  //to set the contact detail
  useEffect(()=>{
    const getcontact = async() => {
      try{
        const res = await fetch(`https://cerulean-marlin-wig.cyclic.app/activities/6393bb5469073dc45849ca7a`)
        const data = await res.json()
        console.log(data)
        setContactDetail(data)
      }catch(err){
        console.log(err)
        alert("Failed to fetch data")
      }
    }
    getcontact()
  },[])
  
  if (!contactDetail) return <ShimmerCard />

  return (
    <div className=''>
      <div className='archieve-container flex justify-between mt-4'>
        <button className='cursor-pointer'><i className='bx bxs-chevrons-left bx-sm text-slate-500' onClick={() => handleBack()}></i></button>
      </div>
      <div className='profile-container'>
        <div className=''>
          <img src={profileImg} alt='profile' className=' w-16 bg-gray-200 rounded-full p-2 border-2 border-gray-500 mx-auto mt-6' />
          <p className='text-center my-2'>{contactDetail?.to}</p>
        </div>
      </div>
      <div className='flex justify-center gap-6 my-4'>
        <div className='text-center'>
          <div className=' rounded-full '><i className='bx bx-right-top-arrow-circle text-blue-800 bg-blue-300 rounded-full p-3'></i></div>
          <div>
            <p>Via</p>
            <p className=' font-semibold'>{contactDetail?.via}</p>
          </div>
        </div>
        <div className='text-center'>
          <div className=' rounded-full '><i className='bx bx-timer text-blue-800 bg-blue-300 rounded-full p-3'></i></div>
          <div>
            <p>Duration</p>
            <p className=' font-semibold'>{contactDetail?.duration} mins</p>
          </div>
        </div>
        <div className='text-center'>
          <div className=' rounded-full '><i className='bx bx-phone text-blue-800 bg-blue-300 rounded-full p-3'></i></div>
          <div>
            <p>Call type</p>
            <p className=' font-semibold'>{contactDetail?.call_type}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactDetails