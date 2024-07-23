import { useLocation, useParams } from "react-router-dom"
import "./successPayment.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { createOrderProductRequest } from "../../../api/orders"
import { userContext } from "../../../context/usersContext"
export const SuccessPayment = () => {
    const {userData} = useContext(userContext)
    /*useLocation proporciona la url actual de este componente*/ 
    const location = useLocation()
    /*location.search obtiene la parte de la url que sigue despues del ?*/
    const queryParams = new URLSearchParams(location.search);
    const preference_id = queryParams.get("preference_id");

    useEffect(()=>{
       const createOrder = async(preference, data)=>{
        try {
            const res = await createOrderProductRequest(preference, data)
            console.log(res.data)
        } catch (error) {
        }
       }
       if(preference_id){
        createOrder(preference_id, userData)
       
       }
     
    },[])

return (
    <main className="container-success-payment" >
        <section className="container-text-payment" >
            <h1 className="text-success-payment">La transaccion se realizco con exito</h1>
        </section>
    </main>
)
}