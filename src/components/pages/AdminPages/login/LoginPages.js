import { Button, Form } from "react-bootstrap"
import "./loginPages.css"
import logoProhogar from "../../../../assets/images/logoProhogar-removebg-preview.png"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {  FORMADDPRODUCTS } from "../../../../config/routes/path"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)
 const LoginPages = ()=>{
    const [adminData,setAdminData] = useState({
        username: null,
        password: null,
    })
    const navigate = useNavigate()

    const login = ()=>{
        if(adminData.username == "prohogar" && adminData.password == "mucp740610"){
           navigate(FORMADDPRODUCTS)
        }else{
          MySwal.fire({
            title:'Las credenciales son invalidas',
            icon:'error'
          })
        }
    }
    return (
        <>
         <div className="container-form-admin">
            <img  src={logoProhogar} alt="logo de prohogar"/>
            <Form className="form-admin" >
                <Form.Label>Nombre de administrador</Form.Label>
                <Form.Control onChange={(e)=>{
                   setAdminData({...adminData, username: e.target.value})
                }} type="text" placeholder="nombre de usuario"/>
                <Form.Label>Codigo de acceso</Form.Label>
                <Form.Control onChange={(e)=>{
                    setAdminData({...adminData, password: e.target.value})
                }}   type="password" placeholder="contraseña"/>
                <Button className="btn-admin"  variant="warning" onClick={login}>Ingresar</Button>
                
            </Form>
         </div>
        </>
    )
 }

 export default LoginPages