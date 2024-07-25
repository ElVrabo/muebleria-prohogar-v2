import axios from "axios";

const instance = axios.create({
    // baseURL:"http://localhost:4000/api",
    baseURL:"https://api-ecommerce-prohogar.vercel.app/api",
    /*Es para que este dominio pueda enviar y recibir cookies para autenticar usuarios*/ 
    withCredentials:true
})

export default instance