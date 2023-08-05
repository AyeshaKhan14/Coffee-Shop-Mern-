import { useEffect, useState } from 'react'
import { Nav } from '../Components/Nav'
import "../Style/ProductCard.css"
import axios from 'axios'
import { Loading } from '../Components/Loading'
import { ProductCard } from '../Components/ProductCard'

const Product = () => {
const [data,setData] = useState([])
const [loading,setLoading]= useState(false)

useEffect(()=>{
  setLoading(true)
    axios.get("https://coffee-shops.onrender.com")
    .then((res)=>{
      console.log(res.data.data)
      setData(res.data.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
},[])

  if(loading){
    return <Loading/>
  }


  return (
    <div>
        <Nav/>
        <div className='Product-div'>
             {data.map((el)=> <ProductCard key={el.id} data={el} />)}
        </div>
    </div>
  )
}

export default Product