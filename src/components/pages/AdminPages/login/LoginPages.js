import { Button } from "react-bootstrap"
import "./loginPages.css"
import logoProhogar from "../../../../assets/images/logoProhogar-removebg-preview.png"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {  FORMADDPRODUCTS } from "../../../../config/routes/path"

 const LoginPages = ()=>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const msjError = useRef()
    const navigate = useNavigate()

    const login = ()=>{
        if(username == "prohogar" && password == "mucp740610"){
           navigate(FORMADDPRODUCTS)
        }else{
          msjError.current.innerHTML = "Las credenciales que ingresaste son incorrectas"
        }
    }
    return (
        <>
         <div className="container-form-admin">
            <img src={logoProhogar} alt="logo de prohogar" style={{height:"100px",width:"200px"}}/>
            <form className="form-admin" >
                <label>Ingresa tu nombre de usuario</label>
                <input onChange={(e)=>{
                    setUsername(e.target.value)
                }}  type="text" placeholder="nombre de usuario"/>
                <label>Ingresa tu contraseña</label>
                <input onChange={(e)=>{
                     setPassword(e.target.value)
                }} type="password" placeholder="contraseña"/>
                <div style={{backgroundColor:"red", borderRadius:"5px"}}>
                    <p style={{color:"white"}} ref={msjError}></p>
                </div>
                <Button className="btn-admin"  variant="warning" onClick={login}>Ingresar</Button>
                
            </form>
         </div>
        </>
    )
 }

 export default LoginPages