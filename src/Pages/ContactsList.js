import React, { useEffect, useState } from 'react'
import ShimmerCard from "../components/Shimmer"
import axios from 'axios'
import { BASE_URL } from '../Utils/constants'
import ContactsCard from '../components/ContactsCard'
const ContactsList = () => {
  const [contactDetails, setContactDetails] = useState()

  const controller = new AbortController();
  const { signal } = controller;
  //get all contacts
  useEffect(() => {
    const getContactList = async () => {
      try {
        const res = await axios.get(BASE_URL + "/activities", { signal })
        let filteredData = res.data.filter((data) => data.is_archived === false)
    
        const today = new Date();
        const todayDateString = today.toISOString();
        const modifiedData = [...filteredData, {
          "direction": "inbound",
          "from": 1234,
          "to": 1234,
          "via": 1234,
          "duration": 21312,
          "is_archived": false,
          "call_type": "missed",
          "id": "639a10a9328500b1a0fa9c04",
          "created_at": todayDateString,
        }, {
          "direction": "outbound",
          "from": 5678,
          "to": 1234,
          "via": 9836,
          "duration": 21312,
          "is_archived": false,
          "call_type": "voicemail",
          "id": "639a10a9328500b1a0fa9q03",
          "created_at": todayDateString,
        }]
        const sortedData = modifiedData.sort((first, second) => {
          return new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
          });
        setContactDetails(sortedData)
        console.log("Contact List", modifiedData)
      } catch (error) {
        console.log(error)
        if (!axios.isCancel(error)) {
          alert("Something went wrong")
        }
      }
    }
    getContactList()

    return () => {
      controller.abort()
    }
  }, [])

  if (!contactDetails) return <ShimmerCard />
  return (
    <div className=''>
      {contactDetails.length === 0 && (<h1>No Contacts found</h1>)}

      {contactDetails.map((data,index) => (
        <ContactsCard key={index} data={data} setContactDetails={setContactDetails} contactDetails={contactDetails} />
      ))}
    </div>
  )
}

export default ContactsList