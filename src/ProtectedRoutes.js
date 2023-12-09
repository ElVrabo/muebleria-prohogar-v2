import { useContext } from "react"
import { userContext } from "./context/usersContext"
import { Navigate, Outlet } from "react-router-dom"
import { FORMLOGIN } from "./config/routes/path"

const ProtectedRoutes = ()=>{
    const {loading,isAuth} = useContext(userContext)

    
    /*si loading es true, esto quiere decir que la verificacion de autenticacion esta en curso*/ 
   if(loading){
    return <h1>Verificando</h1>
   }
   /*si isAuth es false y loading es false (el servidor no responde nada), quiere decir que la 
   verificacion de autenticacion se completo, pero el usuario no esta autenticado */ 
   if(!isAuth && !loading){
    return <Navigate to={FORMLOGIN} replace/>
   }
   /*Si isAuth es true y loading es false, quiere decir que el usuario esta autenticado y 
   termino la verificacion de autenticacion*/
   return <Outlet/>
}

export default ProtectedRoutes