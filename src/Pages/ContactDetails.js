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
  useEffect(() => {
    const { id } = useParams()
    const getContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}activities/${id}`, { signal })
        setContactDetail(res.data)
        console.log("Contact List", res.data)
      } catch (error) {
        console.log(error)
        if (!axios.isCancel(error)) {
          alert("Something went wrong")
          return
        }
      }
    }
    getContact()

    return () => {
      controller.abort()
    }
  }, [])
  const archieveContact = async (id) => {
    const updateURL = `${BASE_URL}activities/${id}`
    try {
      const res = await axios.patch(updateURL, { is_archived: true })
      if (res.data) alert(res.data)
    } catch (error) {
      alert("Contact is not archieved")
    }
  }
  if (!contactDetail) return <ShimmerCard />
  return (
    <div className=''>
      <div className='archieve-container flex justify-between mt-4'>
        <button className='cursor-pointer'><i class='bx bxs-chevrons-left bx-sm text-slate-500' onClick={() => handleBack()}></i></button>
        {!contactDetail.is_archived && (
          <button className='' onClick={() => archieveContact(contactDetail.id)}><i class='bx bx-archive-in bx-sm text-slate-500'></i></button>
        )}
      </div>
      <div className='profile-container'>
        <div className=''>
          <img src={profileImg} alt='profile' className=' w-16 bg-gray-200 rounded-full p-2 border-2 border-gray-500 mx-auto mt-6' />
          <p className='text-center my-2'>{contactDetail?.to}</p>
        </div>
      </div>
      <div className='flex justify-center gap-6'>
        <div>
          <div className='p-2 rounded-full bg-blue-300'><i class='bx bxs-message-alt-detail text-blue-800'></i></div>
          <div>
            <p>{contactDetail?.call_type}</p>
          </div>
        </div>
        <div>
          <div className='p-2 rounded-full bg-blue-300'><i class='bx bxs-time-five text-blue-800'></i></div>
          <div>
            <p>{contactDetail?.duration}</p>
          </div>
        </div>
        <div>
          <div className='p-2 rounded-full bg-blue-300'><i class='bx bx-calendar text-blue-800'></i></div>
          <div>
            <p>{contactDetail?.duration}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactDetails