import "./navigation.css"
import { Link,useNavigate } from "react-router-dom";
import { CATALOG, CONTACT, HOME, PROFILE, SHOPPINGCART } from "../../../config/routes/path";
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
import { useContext, useEffect, useState} from "react";
import { userContext } from "../../../context/usersContext";
import iconCart from "../../../assets/icons/shopping-cart.png"
import iconProfile from "../../../assets/images/Recurso 12.png"
import { productsContext } from "../../../context/productsContext";






export const Navigation = () => {
  // const {numberProducts} = useContext(productsContext)
  const {userData} = useContext(userContext)
  const navigate = useNavigate()
  



  return (
    <>
      <nav
        className="navigation"
      >
        <div className="logo-furniture">
             <img src={logoProhogar}/>
        </div>
        <div className="link-navigation" >
         <h5>Hola {userData.username}</h5>
          <Link to={HOME} className="links"  >Inicio</Link>
          <Link to={CATALOG} className="links" >Productos</Link>
          <Link to={CONTACT} className="links" >Contacto</Link>
          <div className="profile-container" >
          <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src={userData.avatar?`http://localhost:4000/api/${userData.avatar}`:iconProfile} alt="icono profile"  />
          <Link to={PROFILE} className="link-profile" >Mi cuenta</Link>
          </div>
           <div className="icon-cart">
           <img src={iconCart} onClick={()=>{
          navigate(SHOPPINGCART)
         }} />
          
           </div>
        </div>
        
      </nav>
    
    </>
  );
};
