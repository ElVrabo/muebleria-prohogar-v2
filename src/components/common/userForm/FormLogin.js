import "./formLogin.css"
import { useContext, useEffect } from "react"
import { userContext } from "../../../context/usersContext"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { FORMREGISTER, HOME, REGISTER } from "../../../config/routes/path"
import { Button } from "react-bootstrap"
import { Alert } from "react-bootstrap"

const FormLogin = ()=>{
    const {loginUser,incorrectPassword,setIncorrectPassword} = useContext(userContext)
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            setIncorrectPassword(false)
        },5000)
    },[incorrectPassword])

    const login =handleSubmit(async(value)=>{
        await loginUser(value)
        navigate(HOME)
    })
    return (
        <>
        <div className="container-form-login">
        {/* <img src={logoProhogar} alt="logo de prohogar" style={{height:"100px",width:"200px"}}/> */}
            <form className="form-login" onSubmit={login}>
                <h2 style={{marginTop:"15px", color:"#FAB125"}}>Inicia sesion</h2>
                <div style={{display:"flex", gap:"10px"}}>
                    <p style={{color:"grey"}}>¿No tienes una cuenta?</p>
                    <Link style={{textDecoration:"none",color:"#F48F0C"}} to={REGISTER}>Registrarme</Link>
                </div>
                <label className="label-inputs">Username</label>
                <input className="input-text" {...register('username')} type="text" placeholder="ingresa tu nombre de usuario"/>
                <label className="label-inputs">Password</label>
                <input className="input-text" {...register('password')} type="password" placeholder="ingresa tu contraseña"/>
                <Button type="submit" style={{width:"95%",margin:"14px", color:"#ffffff"}} variant="warning" >Iniciar sesion</Button>
                <div >
                    {incorrectPassword && (
                        <Alert variant="danger" >{incorrectPassword}</Alert>
                    )}
                </div>
            </form>
        </div>
        </>
    )
}

export default FormLogin