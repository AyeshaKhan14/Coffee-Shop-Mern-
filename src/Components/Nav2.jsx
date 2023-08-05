import { Link } from "react-router-dom";
import "../Style/Nav2.css"

export const Nav2 = () => {
  return (
    <>
          <div className='nav2-cont'>
          <div className='add'>
            <Link to="/admin">Admin</Link>
            <div >
            <Link to="/">Home</Link>
        </div>
        </div>
       
        <div className='nav2-div1'>
           <div><Link to="/dashboard"> DashBoard</Link></div>
           <div><Link to="/admincontact">Contact</Link> </div>
           <div><Link to="/adminabout">About</Link></div>
        </div>
       
    </div>
    </>
  )
}
