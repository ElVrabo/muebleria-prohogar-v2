import { FORMADDPRODUCTS, MANAGEPRODUCTS } from "../../../config/routes/path"
import "./headerAdmin.css"
import { Link } from "react-router-dom"
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
import { Button } from "react-bootstrap"
const HeaderAdmin = ()=>{
    return (
        <>
        <nav className="navbar">
            <h5 style={{marginLeft:"10px"}}>Hola prohogar</h5>
            <Button style={{color:"#ffffff"}} variant="warning">Cerrar sesion</Button>
        </nav>
        
        </>
    )
}

export default HeaderAdmin