import React, { useEffect, useState } from 'react'
import ShimmerCard from "../components/Shimmer"
import axios from 'axios'
import { BASE_URL } from '../Utils/constants'
import ContactsCard from '../components/ContactsCard'
const ContactsList = () => {
  const [contactDetails, setContactDetails] = useState()
  const controller = new AbortController();
  const { signal } = controller;
  useEffect(()=>{
    const getContactList = async()=>{
      try {
        const res = await axios.get(BASE_URL+"/activities", {signal})
        setContactDetails(res.data.filter((data)=>data.is_archived===false))
        console.log("Contact List",res.data.filter((data)=>data.is_archived===false))
      } catch (error) {
        console.log(error)
        if (!axios.isCancel(error)) {
          alert("Something went wrong")
          return
        }
      }
    }
    getContactList()

    return  () => {
      controller.abort() 
    }
  },[])
  const archieveall = async () => {
    // Clear the contactDetails array
    setContactDetails([]);
    try {
      for (const contactDetail of contactDetails) {
        const updateURL = `${BASE_URL}activities/${contactDetail.id}`;
        const res = await axios.patch(updateURL, { is_archived: true });
        if (res.data) console.log(res.data);
      }
  
      await Promise.all(
        contactDetails.map(async (contactDetail) => {
          const updateURL = `${BASE_URL}activities/${contactDetail.id}`;
          const res = await axios.patch(updateURL, { is_archived: true });
          if (res.data) console.log(res.data);
          return res.data;
        })
      );

    } catch (error) {
      console.error("Error archiving contacts:", error);
      alert("Contact is not archived");
    }
  };
  if(!contactDetails) return <ShimmerCard/>
  return (
    <div className=' max-h-[800px] overflow-y-auto'>
      {contactDetails.length===0 && (<h1>No Contacts found</h1>)}
      {contactDetails.length>0 && (<button onClick={()=>archieveall()} className='bg-blue-800 text-white rounded-lg p-2 my-2 '>Archieve All <i class='bx bx-archive-in' style={{color: "#ffffff"}}  ></i></button>)}
      {contactDetails.map((data)=>(
        <ContactsCard key={data.id} data={data} setContactDetails={setContactDetails} contactDetails={contactDetails}/>
      ))}
    </div>
  ) 
}

export default ContactsList