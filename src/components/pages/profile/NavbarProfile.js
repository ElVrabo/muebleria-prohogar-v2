import "./profile.css"
import { useContext } from "react"
import { userContext } from "../../../context/usersContext"
import { Link } from "react-router-dom"
import {  PROFILE } from "../../../config/routes/path"
import Navbar from 'react-bootstrap/Navbar';
const NavbarProfile = ()=>{
 const {logout} = useContext(userContext)
    return (
        <>
           <Navbar  bg="light" data-bs-theme="light" className="navbar-profile">
            
            <Link to={PROFILE} style={{textDecoration:"none",color:"black"}} >Informacion</Link>
            <Link  style={{textDecoration:"none",color:"black"}} onClick={async ()=>{
                await logout()
            }}>Cerrar sesion</Link>
          </Navbar>
        </>
    )
}
export default NavbarProfile