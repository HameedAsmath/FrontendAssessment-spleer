import axios from 'axios'
import React from 'react'
import { BASE_URL } from "../Utils/constants"
import { useNavigate } from 'react-router-dom'

const ContactsCard = ({ data, setContactDetails, contactDetails}) => {
  const archieveContact = async (id) => {
    const updateURL = `${BASE_URL}activities/${id}`
    try {
      const res = await axios.patch(updateURL, { is_archived: true })
      if (res.data) alert(res.data)
      setContactDetails(contactDetails.filter((contacts) => contacts.id !== id))
    } catch (error) {
      alert("Contact is not archieved")
    }
  }
  const createdAt = new Date(data.created_at)
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const dateOptions = {
    month: 'short',
    day: 'numeric',
  };
  const navigate = useNavigate()
  const handleNavigation = (id) => {
    navigate(`/activities/${id}`)
  }
  const formattedTime = createdAt.toLocaleString('en-US', timeOptions);
  const formattedDate = createdAt.toLocaleString('en-us', dateOptions)
  return (
      <div className='shadow-lg rounded-lg flex flex-row justify-between px-2 items-center mt-1'>
        <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={()=>handleNavigation(data.id)}>
          <div>
            {data.direction === "inbound" ? <i className='bx bx-phone-incoming bx-md' style={{ color: data.call_type === "missed" ? "#ef4444" : "" }}  ></i> : <i className='bx bx-phone-outgoing bx-md'></i>}
          </div>
          <div>
            <p className=''>{data.to ? data.to : "unknown"} {data.call_type === "voicemail" ? <i className='bx bx-user-voice' style={{color: "#1e40af"}}></i> : ""}</p>
            <p className='text-[12px] font-thin'>{formattedDate}</p>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <div><p>{formattedTime}</p></div>
          <div onClick={() => handleNavigation(data.id)} className=' cursor-pointer'><i className='bx bx-dots-vertical-rounded bx-sm' style={{color: "#1e40af"}}></i></div>
        </div>
      </div>
  )
}

export default ContactsCard