import { createContext, useEffect, useState } from "react";
import { addAddressUserRequest, editProfileRequest, getUserRequest, loginUserRequest, registerUserRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const userContext = createContext()

export const UserContextProvider = ({children})=>{
    const[isAuth,setIsAuth] = useState(false)
    const [userData,setUserData] = useState()
    const [incorrectPassword,setIncorrectPassword] = useState()
    const [loading,setLoading] = useState(true)
    
 
    const registerUser = async(data)=>{
        try {
            const res = await registerUserRequest(data)
            setUserData(res.data)
            setIsAuth(true)
        } catch (error) {
            
        }
    }
    const loginUser = async(data)=>{
try {
    const res = await loginUserRequest(data)
    setUserData(res.data)
    setIsAuth(true)
    
} catch (error) {
    setUserData(null)
    setIncorrectPassword(error.response.data)
    setIsAuth(false)
}
    }
    const logout = ()=>{
        /*Elimina la cookie token del navegador*/
         Cookies.remove('token')
        /*No esta autenticado el usuario*/ 
        setIsAuth(false)
        /*No hay ningun dato de usuario*/ 
        setUserData(null)
        setLoading(false)
        
        
    }
    const editProfile = async(id,user)=>{
        try {
            const res = await editProfileRequest(id,user)
        } catch (error) {
            
        }
    }
    const getUser = async(id)=>{
        try {
            const res = await getUserRequest(id)
            setUserData(res.data)
        } catch (error) {
            
        }
    }
    const addAddressUser = async(address)=>{
        try {
             const res= await addAddressUserRequest(address)
             console.log(res.data)
        } catch (error) {
            
        }
    }
     /*Este useEffect se ejecuta en los componentes que consumen este contexto*/
    useEffect(()=>{
        /*funcion para checar si el usuario esta autenticado*/ 
  async function checkLogin(){
    /*se obtienen todas las cookies del navegador*/
    const cookies = Cookies.get()
    
    /*si no hay ninguna cookies llamada token, quiere decir que no esta autenticado el usuario*/ 
    if(!cookies.token){
        /*No esta autenticado el usuario*/ 
        setIsAuth(false)
        setUserData(null)
        /*termina la verificacion de autenticacion*/ 
        setLoading(false)
    }
    
    try {
        /*si si hay token, se va enviar ese token al servidor para que lo verifique*/ 
        const res = await verifyTokenRequest(cookies.token)
        /*si el servidor no responde nada quiere decir que el token es invalido y el usuario
        no esta autenticado*/ 
        if(!res.data){
            setIsAuth(false)
            setUserData(null)
            setLoading(false)
            return
        } 
        /*Si responde algo el servidor quiere decir que el usuario si esta autenticado, y se
        establecen los datos de ese usuario en userData e isAuth es true, con esto cada que se
        refresque la pagina se seguiran viendo los datos del usuario*/ 
        setIsAuth(true)
        setUserData(res.data)
        /*termina la verificacion de autenticacion*/ 
        setLoading(false)
    } catch (error) {
        setIsAuth(false)
        setUserData(null)
        setLoading(false)
    }
  }
  checkLogin()
    },[])


    return (
        <userContext.Provider value={{
      registerUser,
      loginUser,
      logout,
      userData,
      isAuth,
      loading,
      incorrectPassword,
      setIncorrectPassword,
      editProfile,
      getUser,
      addAddressUser
    
        }}>
            {children}
        </userContext.Provider>
    )
}