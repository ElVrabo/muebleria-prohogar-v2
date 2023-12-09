import "./formRegister.css"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { userContext } from "../../../context/usersContext"
import { Link } from "react-router-dom"
import { FORMADMIN, FORMLOGIN } from "../../../config/routes/path"
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
        <div className="container-form-register">
            {/* <img src={logoProhogar} alt="logo de prohogar" style={{height:"150px",width:"200px",marginTop:"10px"}}/> */}
            <form className="form-register" onSubmit={registerNewUser}>
               
                <h2 style={{marginTop:"15px", color:"#FAB125"}}>Crea tu cuenta</h2>
                <div style={{display:"flex", gap:"10px"}}>
                    <p style={{color:"grey"}}>¿Ya tienes cuenta?</p>
                    <Link style={{textDecoration:"none", color:"#F48F0C"}} to={FORMLOGIN}>Inicia sesion!</Link>
                </div>
                <label className="label-inputs">Email</label>
         
                <input className="input-text" {...register('email')} type="text" placeholder="Ingresa tu correo"/>
                
                <label className="label-inputs">Username</label>
                <input className="input-text" {...register('username')} type="text" placeholder="Ingresa tu nombre de usuario"/>
                <label className="label-inputs">Password</label>
                <input className="input-text" {...register('password')} type="password" placeholder="Crea una contraseña"/>
               <Button type="submit"  style={{width:"95%",margin:"14px", color:"#ffffff"}} variant="warning">Registrarme</Button>
               <Link to={FORMADMIN} style={{color:"#D86A07"}}>Inicia sesion como administrador</Link>
            </form>
        </div>
        </>
    )
}
export default FormRegister