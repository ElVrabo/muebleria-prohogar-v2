import "./formRegister.css"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { userContext } from "../../../context/usersContext"
import { Link, useNavigate } from "react-router-dom"
import {  LOGIN, LOGINADMIN } from "../../../config/routes/path"
import { Button } from "react-bootstrap"
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)





const FormRegister = ()=>{
    const [userData,setUserData] = useState({
        email:null,
        username:null,
        password:null
    })
    const {registerUser} = useContext(userContext)
    const navigate = useNavigate()

    const register = async (e)=>{
        e.preventDefault()
        if(!userData.email || !userData.username || !userData.password){
          await MySwal.fire({
            title:"Rellena los campos",
            icon:"error"
          })
          return 
        }
        const newRegister = {
              email:userData.email,
              username:userData.username,
              password:userData.password
        }
        await registerUser(newRegister)
    }

    return (
        <>
        <div className="container_form_register">
            {/* <img src={logoProhogar} alt="logo de prohogar" style={{height:"150px",width:"200px",marginTop:"10px"}}/> */}
            <form className="form_register" onSubmit={register}>
               
                <h2 style={{marginTop:"15px", color:"#FAB125"}}>Crea tu cuenta</h2>
                <div style={{display:"flex", gap:"10px"}}>
                    <p style={{color:"grey"}}>¿Ya tienes cuenta?</p>
                    <Link style={{textDecoration:"none", color:"#F48F0C"}} to={LOGIN}>Inicia sesion!</Link>
                </div>
                <label className="label_inputs">Email</label>
         
                <input className="input_email"  type="text" placeholder="Ingresa tu correo" onChange={(e)=>{
                    setUserData({...userData,email:e.target.value})
                }} />
                
                <label className="label_inputs">Username</label>
                <input className="input_username" type="text" placeholder="Ingresa tu nombre de usuario" onChange={(e)=>{
                    setUserData({...userData,username:e.target.value})
                }} />
                <label className="label_inputs">Password</label>
                <input className="input_password"  type="password" placeholder="Crea una contraseña" onChange={(e)=>{
                    setUserData({...userData,password:e.target.value})
                }} />
               <Button type="submit"  style={{width:"95%",margin:"14px", color:"#ffffff"}} variant="warning">Registrarme</Button>
               <Link to={LOGINADMIN} style={{color:"#D86A07", textDecoration:"none"}}>¡Inicia sesion como administrador!</Link>
            </form>
        </div>
        </>
    )
}
export default FormRegister