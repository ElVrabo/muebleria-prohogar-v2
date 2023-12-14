import { useState } from "react"
import "./sideBar.css"
import { Link } from "react-router-dom"
import { FORMADDPRODUCTS, MANAGEPRODUCTS } from "../../../config/routes/path"

const SideBar = ()=>{
    const [inventarioOpen,setInventarioOpen] = useState(false)
    return (
        <>
         <div className="sidebar">
            <h2 style={{ color:"#ffffff"}}>Inventario</h2>
            <Link className="sidebar-links" onClick={()=>{
                setInventarioOpen(!inventarioOpen)
            }}>Productos</Link>
            {inventarioOpen && (
                <div className="submenu">
                    <Link to={FORMADDPRODUCTS} className="submenu-links">Registrar</Link>
                    <Link to={MANAGEPRODUCTS} className="submenu-links" >Ver inventario</Link>
                </div>
            )}
            <Link className="sidebar-links">Proveedores</Link>
            <Link className="sidebar-links">Usuarios</Link>
         </div>
        </>
    )
}
export default SideBar