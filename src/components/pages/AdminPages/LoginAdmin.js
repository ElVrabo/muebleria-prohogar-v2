import { Button } from "react-bootstrap"
import "./formAdmin.css"
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DASHBOARD } from "../../../config/routes/path"

 const LoginAdmin = ()=>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const msjError = useRef()
    const navigate = useNavigate()

    const login = ()=>{
        if(username == "prohogar" && password == "mucp740610"){
           navigate(DASHBOARD)
        }else{
          msjError.current.innerHTML = "Las credenciales que ingresaste son incorrectas"
        }
    }
    return (
        <>
         <div className="container-form-login">
            <img src={logoProhogar} alt="logo de prohogar" style={{height:"100px",width:"200px"}}/>
            <form className="form-login" >
                <div style={{backgroundColor:"red", borderRadius:"5px", width:"95%", marginTop:"5px"}}>
               <h6 style={{color:"white"}}>A esta seccion solo tiene acceso el administrador de prohogar. Gracias por su comprenion.</h6>
                </div>
                <label>Ingresa tu nombre de usuario</label>
                <input onChange={(e)=>{
                    setUsername(e.target.value)
                }} className="input-admin" style={{width:"95%",height:"45px", border:"1px solid #ccc", borderRadius:"5px"}} type="text" placeholder="nombre de usuario"/>
                <label>Ingresa tu contraseña</label>
                <input onChange={(e)=>{
                     setPassword(e.target.value)
                }} className="input-admin" style={{width:"95%",height:"45px", border:"1px solid #ccc", borderRadius:"5px"}} type="password" placeholder="contraseña"/>
                <div style={{backgroundColor:"red", borderRadius:"5px"}}>
                    <p style={{color:"white"}} ref={msjError}></p>
                </div>
                <Button style={{width:"95%"}} variant="warning" onClick={login}>Ingresar</Button>
                
            </form>
         </div>
        </>
    )
 }

 export default LoginAdmin