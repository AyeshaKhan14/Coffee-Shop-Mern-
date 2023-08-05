import { useEffect, useState } from "react"
import { Nav } from "../Components/Nav"
import "../Style/About.css"
import axios from "axios"

export const About = () => {

  const [about,setAbout] = useState([])

  useEffect(()=>{
    axios.get("https://coffee-shops.onrender.com/about")
    .then((res)=>{
      setAbout(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  })



  return (
    <>
    <Nav/>
    <div className="mainContainer">
      <div className="paraCont">
        <h1>About Coffee Shop</h1>
       <div className="coffeepara"> <p>coffee, beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plants of African origin. Coffee is one of the three most popular beverages in the world (alongside water and tea) and one of the most profitable international commodities. Though coffee is the basis for an endless array of beverages, its popularity is mainly attributed to its invigorating effect, which is produced by caffeine, an alkaloid present in coffee.</p></div>
       <div >
        <p>Various studies have suggested that caffeine, which is present in coffee and many other beverages, may help protect against Parkinson’s disease.</p>
       <p>One team concluded that men who drink over four cups of coffee per day might have a fivefold lower risk of Parkinson’s disease than those who do not.</p>
       </div>
       <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
        <img width="300px" height="300px" src="https://images.unsplash.com/photo-1502471602546-17554aac1160?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"/>
       </div>
      </div>
  
     <div className="aboutUS">
      <h2>About Us</h2>
     </div>

      <div className="review">
        {about.map((el)=>{
          return <div key={el._id}>
            <img src={el.image} />
            <h4>{el.name}</h4>
            <p >{el.review}</p>
            </div>
        })}
      </div>
    </div>
    </>
  )
}
