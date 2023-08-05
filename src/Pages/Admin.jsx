import { useState } from 'react'
import { Nav2 } from '../Components/Nav2'
import "../Style/Admin.css"
import axios from "axios"
import { useToast } from '@chakra-ui/react'

export const Admin = () => {
    const toast = useToast()
    const [product,setProduct] = useState({
        "title":"",
        "image":"",
        "desc":"",
        "price":""

    })

  const handleChange=(e)=>{
    const {name,value}=e.target
    setProduct({...product,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
  axios.post(`https://coffee-shops.onrender.com/create`,product)
  .then((res)=>{
    // console.log(res)
    if(res.data.mssg==="Product Already Exists")
    {
        toast({
            title: 'Product Already Exists.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:"top"
          })
    }
    else{
        toast({
            title: 'Product Added Successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:"top"
          })
          setProduct({
            "title":"",
            "image":"",
            "desc":"",
            "price":""
          })
    }
  }).catch((err)=>{
    console.log(err)
  })
  }
 

  return (
    <div>
        <Nav2/>
        <div className='post-data'>
            <h1>Post Data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder='Title' type="text" name="title" value={product.title} onChange={handleChange}  />
                </div>
                <div>
                    <input placeholder='image' type="text" name="image" value={product.image} onChange={handleChange} />
                </div>
                <div>
                    <input placeholder='description' type="text" name="desc" value={product.desc} onChange={handleChange} />
                </div>
                <div>
                    <input placeholder='price' type="text"  name="price" value={product.price} onChange={handleChange}/>
                </div>
                <button type="submit" className="newbutton">Submit</button>
            </form>
        </div>
    </div>
  )
}
