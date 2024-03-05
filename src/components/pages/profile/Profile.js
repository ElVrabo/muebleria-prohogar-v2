
import "./profile.css"
import iconProfile from "../../../assets/images/Recurso 12.png"
import NavbarProfile from "./NavbarProfile"
import { useContext, useEffect } from "react"
import { userContext } from "../../../context/usersContext"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const Profile = ()=>{
   
 const {userData,getUser} = useContext(userContext)
 const navigate = useNavigate()

 useEffect(()=>{
  const loadUser = async()=>{
    await getUser(userData._id)
  }
  loadUser()
 },[])


    return (
        <>
          <NavbarProfile/>
          <div className="container-about-user">
            <div className="body-about-user">
                <img src={userData.avatar ? `http://localhost:4000/api/${userData.avatar}`: iconProfile} alt="icon-profile" style={{height:"90px", width:"90px",borderRadius:"50%",border:"1px solid black"}}/>
                
                <div className="container-username">
                  <div className="username">
                  <h4>Usuario: </h4>
                  </div>
                <input style={{width:"200px",height:"35px",margin:"0",borderRadius:"5px",border:"1px solid #F4F2EE"}} type="text" value={userData.username} disabled />
                </div>
               
                 <div className="container-email">
                  <div className="email">

                 <h4>Correo:</h4>
                  </div>
                 <input style={{width:"200px",height:"35px",margin:"0",borderRadius:"5px",border:"1px solid #F4F2EE"}} type="text" value={userData.email} disabled />
                 </div>
        
                 <div className="container-date">
                  <div className="date">

                 <h4>Se registro el dia:</h4>
                  </div>
                 <input style={{width:"200px", height:"35px",margin:"0",borderRadius:"5px",border:"1px solid #F4F2EE" }} type="text" value={new Date(userData.date).toLocaleDateString()} disabled />
                 </div>
                 <div className="container-btn-edit-profile">
                  <Button variant="warning" onClick={()=>{
                      navigate(`/profile/${userData._id}`)
                  }}>Editar informacion</Button>
                 </div>
            </div>
          </div>
        {/* <h1>{userData.username}</h1>
        <h1>{userData.email}</h1>
        <h1>Tu cuenta se creo el: {new Date(userData.date).toLocaleDateString()}</h1> */}
        </>
    )
}
export default Profile