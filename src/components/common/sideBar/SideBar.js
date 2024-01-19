import { useState } from "react"
import "./sideBar.css"
import { Link } from "react-router-dom"
import { CREATEEMPLOYEESPAGES, CREATEUSERSPAGES, EMPLOYEESPAGES, FORMADDPRODUCTS, FORMPROVIDERPRODUCTSPAGES, LISTPROVIDERPRODUCTS, MANAGEPRODUCTS } from "../../../config/routes/path"


const SideBar = ()=>{
    const [subMenuOpen,setSubMenuOpen] = useState({
        inventarioOpen:false,
        providerOpen:false,
        employeesOpen:false,
    })
    return (
        <>
         <div className="sidebar">
            <h2 style={{ color:"black"}}>Hola admin</h2>
            <Link className="sidebar-links" onClick={()=>{
                setSubMenuOpen({...subMenuOpen,inventarioOpen:!subMenuOpen.inventarioOpen})
            }}>Productos</Link>
            {subMenuOpen.inventarioOpen && (
                <div className="submenu">
                    <Link to={FORMADDPRODUCTS} className="submenu-links">Agregar</Link>
                    <Link to={MANAGEPRODUCTS} className="submenu-links" >Ver inventario</Link>
                </div>
            )}
            <Link  className="sidebar-links" onClick={()=>{
                setSubMenuOpen({...subMenuOpen,providerOpen:!subMenuOpen.providerOpen})
            }}>Proveedores</Link>
            {subMenuOpen.providerOpen && (
                <div className="submenu">
             <Link className="submenu-links" to={FORMPROVIDERPRODUCTSPAGES}>Agregar</Link>
             <Link className="submenu-links" to={LISTPROVIDERPRODUCTS} >Ver proveedores</Link>
                </div>
            )}
            <Link className="sidebar-links" onClick={()=>{
                setSubMenuOpen({...subMenuOpen,employeesOpen:!subMenuOpen.employeesOpen})
            }} >Empleados</Link>
            {subMenuOpen.employeesOpen && (
                <div className="submenu" >
                    <Link className="submenu-links" to={CREATEEMPLOYEESPAGES} >Agregar</Link>
                    <Link className="submenu-links" to={EMPLOYEESPAGES} >Ver empleados</Link>
                </div>
            )}
           <div className="logout">
           <Link className="sidebar-links" >Cerrar sesion</Link>
           </div>
         </div>
        </>
    )
}
export default SideBar