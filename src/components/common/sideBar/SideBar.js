import { useState } from "react"
import "./sideBar.css"
import { Link } from "react-router-dom"
import { CREATEEMPLOYEESPAGES, CREATEUSERSPAGES, EMPLOYEESPAGES, FORMADDPRODUCTS, FORMPROVIDERPRODUCTSPAGES, LISTPROVIDERPRODUCTS, MANAGEPRODUCTS } from "../../../config/routes/path"
import iconEmployees from "../../../assets/icons/empleados.png"
import iconProviders from "../../../assets/icons/paquetes.png"
import iconProducts from "../../../assets/icons/agregar-producto.png"
import iconSignOut from "../../../assets/icons/cerrar-sesion.png"
const SideBar = ()=>{
    const [subMenuOpen,setSubMenuOpen] = useState({
        inventarioOpen:false,
        providerOpen:false,
        employeesOpen:false,
    })
    return (
        <>
        <div className="title">
            <h2>Prohogar</h2>
            </div>
         <div className="sidebar">
            <div className="container-icon-products" >
            <img className="icon-products"src={iconProducts} onClick={()=>{
                setSubMenuOpen({...subMenuOpen,inventarioOpen:!subMenuOpen.inventarioOpen})
            }}/>
            <h6>Productos</h6>
            </div>
            
            {subMenuOpen.inventarioOpen && (
                <div className="submenu">
                    <Link to={FORMADDPRODUCTS} className="submenu-links">Agregar</Link>
                    <Link to={MANAGEPRODUCTS} className="submenu-links" >Ver inventario</Link>
                </div>
            )}
            <div className="container-providers" >
            <img  className="icon-providers" src={iconProviders}  onClick={()=>{
                setSubMenuOpen({...subMenuOpen,providerOpen:!subMenuOpen.providerOpen})
            }}/>
            <h6>Proveedores</h6>
            </div>
            
            {subMenuOpen.providerOpen && (
                <div className="submenu">
             <Link className="submenu-links" to={FORMPROVIDERPRODUCTSPAGES}>Agregar</Link>
             <Link className="submenu-links" to={LISTPROVIDERPRODUCTS} >Ver proveedores</Link>
                </div>
            )}
            <div className="container-icon-employees" >
            <img className="icon-employees" src={iconEmployees} onClick={()=>{
                setSubMenuOpen({...subMenuOpen,employeesOpen:!subMenuOpen.employeesOpen})
            }} />
            <h6>Empleados</h6>
            </div>
            
            {subMenuOpen.employeesOpen && (
                <div className="submenu" >
                    <Link className="submenu-links" to={CREATEEMPLOYEESPAGES} >Agregar</Link>
                    <Link className="submenu-links" to={EMPLOYEESPAGES} >Ver empleados</Link>
                </div>
            )}
           <div className="container-logout">
           <img className="icon-logout" src={iconSignOut} />
           <h6>Cerrar sesion</h6>
           </div>
         </div>
        </>
    )
}
export default SideBar