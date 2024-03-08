import "./editProfilePages.css"
import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate, useParams,Link } from "react-router-dom"
import { userContext } from "../../../context/usersContext"
import { CHANGEPASSWORDPAGES, PROFILE } from "../../../config/routes/path"
import iconProfile from "../../../assets/images/Recurso 12.png"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)

const EditProfilePages = ()=>{
    const [avatar,setAvatar] = useState()
    const {userID} = useParams()
    const {getUser,editProfile,userData} = useContext(userContext)
    const navigate = useNavigate()
    const {register,handleSubmit,setValue} = useForm()
    const inputFileRef = useRef()
    useEffect(()=>{
     const loadUser = async ()=>{
        if(userID){
          await getUser(userID)
         setValue('email',userData.email)
         setValue('username',userData.username)
        
        }
     }
     loadUser()
    },[])

    const editInfoProfile = handleSubmit(async(value)=>{
       const formData = new FormData()
       /*En el campo avatar, se inserta el estado avatar, que es la img
       que se selecciono*/
       formData.append('avatar',avatar)
       formData.append('username',value.username)
       formData.append('email',value.email)
       formData.append('password',value.password)
        await editProfile(userID,formData)
        navigate(PROFILE)
    })

    const handleIconClick = ()=>{
      /*Cuando se le de click al icono, se activara el click del input file,
      es decir, se podra elegir un archivo*/ 
      inputFileRef.current.click()
    }
    return (
        <>
          <div className="container-form-edit-profile">
            <form className="form-edit-profile" onSubmit={editInfoProfile} >
              <div className="upload-image-user" >
                {/*el input file tiene un ref nombrado inputFileRef, este input esta
                oculto.*/}
                <input ref={inputFileRef} type="file" onChange={(e)=>{
                  /*e.target.files es un objeto FileList, que es una lista de objetos File, cada objeto
                en la lista representa un archivo seleccionado por el usuario*/
                const files = e.target.files
                if(files.length>0){
                    /*Se accede al primer archivo de la lista de archivos seleccionados*/ 
                const selectedFile = files[0]
                /*actualiza el estado image con el archivo que el usuario este seleccionando*/ 
                setAvatar(selectedFile)
                }else{
                    setAvatar(null)
                }
                }} />
              </div>
              <div className="icon-user"  >
                <img src={userData.avatar? `https://api-dashboard-v6.vercel.app/api/${userData.avatar}`:iconProfile} alt="icono de usuario" onClick={handleIconClick} />
              </div>
                <input type="text" {...register('username')} />
                <input type="text" {...register('email')} />
                <Link style={{textDecoration:"none", color:"black"}} to={CHANGEPASSWORDPAGES} >¿Deseas cambiar tu contraseña?</Link>
                <Button variant="warning" type="submit" >Aceptar</Button>  
            </form>
          </div>
        </>
    )
}
export default EditProfilePages