import "../Style/Nav.css"
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className='nav-cont'>
        <div className='nav-div1'>
           <div><Link to={"/"}>Product</Link></div>
           <div><Link to="/contact">Contact</Link> </div>
           <div><Link to="/about">About</Link></div>
        </div>
        <div className='nav-div2'>
            <Link to="/login">Admin</Link>
        </div>
    </div>
  )
}
