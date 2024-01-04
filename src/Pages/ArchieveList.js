import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constants'
import ContactsCard from '../components/ContactsCard'
import ShimmerCard from '../components/Shimmer'
const ArchieveList = () => {
  const [ArchieveList,setArchieveList] = useState()
  const controller = new AbortController();
  const { signal } = controller;
  useEffect(()=>{
    const getContactList = async()=>{
      try {
        const res = await axios.get(BASE_URL+"/activities", {signal})
        console.log(res?.data)
        console.log("archieved list",res?.data.filter((data)=>data.is_archived===true))
        setArchieveList(res?.data.filter((data)=>data.is_archived===true))
      } catch (error) {
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
  const unarchieveall = async() => {
    try {
      const res = await axios.patch(BASE_URL+"reset")
      setArchieveList([])
      console.log(res.data)
      if(res.data) alert(res.data)
    } catch (error) {
      console.log(error)
      alert("Unarchieved failed")
    }
  }
  if(!ArchieveList) return <ShimmerCard/>
  return (
    <div>
      <div>
        {ArchieveList.length>0 && (<button onClick={()=>unarchieveall()} className='bg-blue-800 text-white rounded-lg p-2 my-2 '>UnArchieve All <i className='bx bx-archive-out' style={{color: "#ffffff"}}  ></i></button>)}
        {ArchieveList.length===0 && (<button onClick={()=>unarchieveall()}><p className='text-center'>No archieved Contacts found</p></button>)}
      </div>
      {ArchieveList.map((data)=>(
        <ContactsCard key={data.id} data={data} setContactDetails={setArchieveList} contactDetails={ArchieveList}/>
      ))}
    </div>
  ) 
}

export default ArchieveList