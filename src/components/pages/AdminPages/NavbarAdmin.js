import { FORMADDPRODUCTS, MANAGEPRODUCTS } from "../../../config/routes/path"
import "./navbarAdmin.css"
import { Link } from "react-router-dom"
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
const NavbarAdmin = ()=>{
    return (
        <>
        <nav className="navbar">
            <div className="logo">
                <img src={logoProhogar} />
            </div>
            <h4>Hola prohogar</h4>
            <Link to={FORMADDPRODUCTS} className="link1">Vender productos</Link>
            <Link to={MANAGEPRODUCTS} className="link2">Inventario de productos</Link>
        </nav>
        
        </>
    )
}

export default NavbarAdmin