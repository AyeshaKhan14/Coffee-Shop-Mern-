import { Route, Routes } from 'react-router-dom'
import Product from '../Pages/Product'
import { Contact } from '../Pages/Contact'
import { About } from '../Pages/About'
import { Login } from '../Pages/Login'
import { Admin } from '../Pages/Admin'
import { DashBoard } from '../Pages/DashBoard'
import { AdminContact } from '../Pages/AdminContact'
import { AdminAbout } from '../Pages/AdminAbout'

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/admincontact" element={<AdminContact/>} />
        <Route path="/adminabout" element={<AdminAbout/>} />
      </Routes>
    </div>
  )
}
