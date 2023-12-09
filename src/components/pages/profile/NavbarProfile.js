import "./profile.css"
import { useContext } from "react"
import { userContext } from "../../../context/usersContext"
import { Link } from "react-router-dom"
import { FAVORITEPRODUCTS, PROFILE } from "../../../config/routes/path"
const NavbarProfile = ()=>{
 const {logout} = useContext(userContext)
    return (
        <>
           <nav className="navbar-profile">
            
            <Link to={PROFILE} style={{textDecoration:"none",color:"#FAB125"}} >Informacion</Link>
            <Link to={FAVORITEPRODUCTS}  style={{textDecoration:"none",color:"#FAB125"}} >Productos favoritos</Link>
            <Link  style={{textDecoration:"none",color:"#FAB125"}}>Soporte</Link>
            <Link  style={{textDecoration:"none",color:"#FAB125"}} onClick={()=>{
                logout()
            }}>Cerrar sesion</Link>
          </nav>
        </>
    )
}
export default NavbarProfile