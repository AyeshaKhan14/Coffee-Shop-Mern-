import { useEffect,useState } from "react"
import { Nav2 } from "../Components/Nav2"
import axios from "axios"
import "../Style/AdminContact.css"


export const AdminContact = () => {
const [data,setData] = useState([])

useEffect(()=>{
      axios.get("https://coffee-shops.onrender.com/contact")
      .then((res)=>{
        console.log(res.data)
        setData(res.data.data)
      }).catch((err)=>{
        console.log(err)
      })
},[])


// console.log(data,"data")


  return (
    <div>
        <Nav2/>
        <div className="newCont">
          <h1>Contact Message from Users</h1>
          <div className="newtable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            
            <tbody>
              {data.map((el) => (
                <tr className="tr" key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.desc}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
