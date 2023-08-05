import { useState } from "react"
import "../Style/Login.css"
import { useNavigate } from "react-router-dom"
import { useToast } from '@chakra-ui/react'


export const Login = () => {
  const toast = useToast()
const navigate=useNavigate()
const [user,setUser] = useState({
    email:"",
    password:""
})

 const handleChange=(e)=>{
    const {name,value}= e.target;
    setUser({...user,[name]:value})
 }

 const handleLogin=(e)=>{
    e.preventDefault()
    if(user.email==="admin@gmail.com" && user.password==="admin")
    {
      toast({
        title: 'Admin Login Sucessfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
        navigate("/admin")
    }
    else if(user.email!=="admin@gmail.com" || user.password!=="admin")
    {
      toast({
        title: 'Invalid Credential.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      })
       
    }
 }


  return (
    <div className="sig-cont-2">
    <div className="sign-form">
      <h1>Admin Login</h1>
      <form className="form-box" onSubmit={handleLogin}>
        <div>
        <input placeholder="admin@gmail.com" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
        <input placeholder="admin" type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="submit" className="butn">LOGIN</button> 
      
      </form>
    </div>
  </div>
  )
}
