import "./formLogin.css"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../../context/usersContext"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {  HOME, REGISTER } from "../../../config/routes/path"
import { Button } from "react-bootstrap"
import { Alert } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)

const FormLogin = ()=>{
    const [userData,setUserData] = useState({
        username:null,
        password:null
    })
    // const [formIsCompleted,setFormIsCompleted] = useState(false)
    const {loginUser,} = useContext(userContext)
    const navigate = useNavigate()

    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        if(!userData.username && !userData.password){
            await MySwal.fire({
             title:"Rellena los campos",
             icon:"error"
            })
            return
        }
        const newUser = {
            username:userData.username,
            password:userData.password
        }
        // setFormIsCompleted(true)
        // if(formIsCompleted){
        await loginUser(newUser)
        
        // }
        
    } 
    return (
        <>
        <div className="container_form_login">
        {/* <img src={logoProhogar} alt="logo de prohogar" style={{height:"100px",width:"200px"}}/> */}
            <Form className="form_login" onSubmit={handleOnSubmit}>
                <h2 style={{marginTop:"15px", color:"black"}}>Inicia sesion</h2>
                <div style={{display:"flex", gap:"10px"}}>
                    <p style={{color:"grey"}}>¿No tienes una cuenta?</p>
                    <Link style={{textDecoration:"none",color:"#F48F0C"}} to={REGISTER}>Registrarme</Link>
                </div>
                <Form.Group  >
                <Form.Label >Username</Form.Label>
                <Form.Control className="inputs" type="text" placeholder="ingresa tu nombre de usuario" onChange={(e)=>{
                    setUserData({...userData,username:e.target.value})
                }}/>
                <Form.Label >Password</Form.Label>
                <Form.Control className="inputs"   type="password" placeholder="ingresa tu contraseña" onChange={(e)=>{
                    setUserData({...userData,password:e.target.value})
                }} />
                </Form.Group>
               <div className="btn-login" >
               <Button type="submit" variant="warning" >Iniciar sesion</Button>
               </div>
                
            </Form>
        </div>
        </>
    )
}

export default FormLogin