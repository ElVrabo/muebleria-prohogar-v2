import "./formRegister.css"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { userContext } from "../../../context/usersContext"
import { Link } from "react-router-dom"
import { FORMADMIN, FORMLOGIN, LOGIN, LOGINADMIN } from "../../../config/routes/path"
import { Button } from "react-bootstrap"
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"






const FormRegister = ()=>{
    const {registerUser} = useContext(userContext)
    const {register,handleSubmit} = useForm()

    const registerNewUser = handleSubmit((value)=>{
        registerUser(value)
    })

    return (
        <>
        <div className="container_form_register">
            {/* <img src={logoProhogar} alt="logo de prohogar" style={{height:"150px",width:"200px",marginTop:"10px"}}/> */}
            <form className="form_register" onSubmit={registerNewUser}>
               
                <h2 style={{marginTop:"15px", color:"#FAB125"}}>Crea tu cuenta</h2>
                <div style={{display:"flex", gap:"10px"}}>
                    <p style={{color:"grey"}}>¿Ya tienes cuenta?</p>
                    <Link style={{textDecoration:"none", color:"#F48F0C"}} to={LOGIN}>Inicia sesion!</Link>
                </div>
                <label className="label_inputs">Email</label>
         
                <input className="input_email" {...register('email')} type="text" placeholder="Ingresa tu correo"/>
                
                <label className="label_inputs">Username</label>
                <input className="input_username" {...register('username')} type="text" placeholder="Ingresa tu nombre de usuario"/>
                <label className="label_inputs">Password</label>
                <input className="input_password" {...register('password')} type="password" placeholder="Crea una contraseña"/>
               <Button type="submit"  style={{width:"95%",margin:"14px", color:"#ffffff"}} variant="warning">Registrarme</Button>
               <Link to={LOGINADMIN} style={{color:"#D86A07", textDecoration:"none"}}>¡Inicia sesion como administrador!</Link>
            </form>
        </div>
        </>
    )
}
export default FormRegister