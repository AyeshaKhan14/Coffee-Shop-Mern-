import { Nav } from '../Components/Nav'
import "../Style/Contact.css"
import {CiLocationOn} from "react-icons/ci"
import {BiSolidPhoneCall} from "react-icons/bi"
import {BiMessageAltDetail} from "react-icons/bi"
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

export const Contact = () => {
  const toast = useToast()
const [contact,setContact] = useState({
  "name":"",
  "email":"",
  "desc":""
})

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setContact({...contact,[name]:value})
  }
 
   const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post(`https://coffee-shops.onrender.com/contact/create`,contact)
    .then((res)=>{
       console.log(res.data)
        
       if(res.data.mssg==="Message Sent")
       {
        toast({
          title: 'Message Sent',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position:"top"
        })
        setContact({
          name: '',
          email: '',
          desc: '',
        });
       }
    }).catch((err)=>{
      console.log(err)
    })

   }

  return (
    <>
      <div className='contDiv'>
      <Nav/>
       <div className='head'> <h2>Contact US</h2></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi</p>
        <div className='container'>
          <div className='divBox1'>
            <div className='address'>
              <div><CiLocationOn style={{fontSize:"23px",color:"black"}}/></div>
             <span style={{color:"blue"}}>Address:</span>  Loreum 
              </div>

              <div className='address'>
              <div><BiSolidPhoneCall style={{fontSize:"23px",color:"black"}}/></div>
             <span style={{color:"blue"}}>Contact:</span>  9876 0000 5678 
              </div>

              <div className='address'>
              <div><BiMessageAltDetail style={{fontSize:"23px",color:"black"}}/></div>
             <span style={{color:"blue"}}>Email: </span>  admin@gmail.com 
              </div>
          </div>


          <div className='divBox2'>
            <p>Send Message</p>
            <form onSubmit={handleSubmit}>
              <div className='inputss'>
                <input placeholder='Name' type="text" name="name" value={contact.name} onChange={handleChange}/>
              </div>

              <div  className='inputss'>
                <input placeholder='Email' type="text"  name="email" value={contact.email} onChange={handleChange} />
              </div>

              <div  className='inputss'>
                <input placeholder='Message' type="text"  name="desc" value={contact.desc} onChange={handleChange}/>
              </div>
              <button className='newbtn' type="Submit">Send </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
