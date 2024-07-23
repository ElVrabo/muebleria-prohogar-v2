import "./editProfilePages.css"
import { useContext, useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate, useParams,Link } from "react-router-dom"
import { userContext } from "../../../context/usersContext"
import { CHANGEPASSWORDPAGES, PROFILE } from "../../../config/routes/path"
import iconProfile from "../../../assets/images/Recurso 12.png"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../../api/firebase/config"
const MySwal = withReactContent(Swal)

const EditProfilePages = ()=>{
    const [user,setUser] = useState({
      image:null,
      email:null,
      username:null
    })
    const {userID} = useParams()
    const {getUser,editProfile,userData} = useContext(userContext)
    const navigate = useNavigate()
    const usernameRef = useRef()
    const emailRef = useRef()
    useEffect(()=>{
     const loadUser = async ()=>{
        if(userID){
          await getUser(userID)
          usernameRef.current.value = userData.username
          emailRef.current.value = userData.email
        
          
        }
     }
     loadUser()
    },[])

    const editInfoProfile = async(e)=>{
       e.preventDefault()
      if(user.image && usernameRef.current.value && emailRef.current.value){
        let urlAvatar = ''
       const storageRef = ref(storage, v4())
       await uploadBytes(storageRef, user.image )
       urlAvatar = await getDownloadURL(storageRef)
       const newProfile = {
        image : urlAvatar,
        username: usernameRef.current.value,
        email: emailRef.current.value
       }
       await editProfile(userData._id,newProfile)
       return navigate(PROFILE)
      }else{
        MySwal.fire({
          title:'Debes de rellenar todos los campos',
          icon:'error'
        })
      }
    }

    
    return (
        <>
          <div className="container-form-edit-profile">
            <Form className="form-edit-profile" onSubmit={editInfoProfile} >
              <div className="upload-image-user" >
                {/*el input file tiene un ref nombrado inputFileRef, este input esta
                oculto.*/}
                <Form.Label>Elige un avatar</Form.Label>
                <Form.Control   type="file" onChange={(e)=>{
                  setUser({...user, image: e.target.files[0]})
                  
                }} />
              </div>
              {/* <div className="icon-user"  >
                <img src={userData.avatar? `https://api-dashboard-v6.vercel.app/api/${userData.avatar}`:iconProfile} alt="icono de usuario" onClick={handleIconClick} />
              </div> */}
                <Form.Label>Usuario:</Form.Label>
                <Form.Control ref={usernameRef}  type="text" onChange={(e)=>{
                  setUser({...user,username:e.target.value})
                }} />
                <Form.Label>Email:</Form.Label>
                <Form.Control ref={emailRef} type="text" onChange={(e)=>{
                  setUser({...user, email:e.target.value})
                }} />
                {/* <Link style={{textDecoration:"none", color:"black"}} to={CHANGEPASSWORDPAGES} >¿Deseas cambiar tu contraseña?</Link> */}
                <Button variant="warning" type="submit" >Aceptar</Button>  
            </Form>
          </div>
        </>
    )
}
export default EditProfilePages