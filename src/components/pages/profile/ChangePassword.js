import "./changePassword.css"
import { useContext } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { userContext } from "../../../context/usersContext"

const ChangePassword = ()=>{
    const {changePassword} = useContext(userContext)
    const {register,handleSubmit,reset} = useForm()

    const handleForm = handleSubmit(async(value)=>{
        await changePassword(value)
        reset()
    })
    return (
        <>
        <div className="container-change-password">
            <form className="form-change-password" onSubmit={handleForm} >
                <div className="input-current-password" >
                <label>Contraseña actual</label>
                <input type="password" {...register('currentPassword')}  />
                </div>
                <div className="input-new-password" >
                <label>Nueva contraseña</label>
                <input type="password" {...register('newPassword')} />
                </div>
                <div className="input-new-password" >
                <label>Confirma la contraseña</label>
                <input type="password" {...register('confirmNewPassword')} />
                </div>
                <Button className="btn-change-password" variant="warning" type="submit" >Cambiar</Button>
            </form>
        </div>
        </>
    )
}

export default ChangePassword