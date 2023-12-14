import "./formAddAddress.css"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { productsContext } from "../../../context/productsContext"
import { useForm } from "react-hook-form"
import { userContext } from "../../../context/usersContext"
import { paymentRequest } from "../../../api/payment"
import { Button } from "react-bootstrap"

const FormAddAdress = ()=>{
    const [productPay,setProductPay] = useState()
    const {ID} = useParams()
    const {getProductOnSale} = useContext(productsContext)
    const {addAddressUser} = useContext(userContext)
    const {register,handleSubmit} = useForm()

    useEffect(()=>{
        const loadProductPay = async ()=>{
           if(ID){
            const product = await getProductOnSale(ID)
            setProductPay(product)
           }
        }
        loadProductPay()
    },[])
   

    

    const sendAddress = handleSubmit(async (value)=>{
            await addAddressUser(value)
            /*Se envia al servidor el producto que se comprara y la direccion,
             que esta es el formuario, sus valores que tiene actualmente*/
            await paymentRequest(productPay).then((res)=>  window.location.href=res.data.response.body.init_point).catch((error)=>console.log(error))
             
    })

    return (
        <>
        <div className="container-form-address" >
            <form className="form-address" onSubmit={sendAddress} >
                <h2>Agrega un domicilio</h2>
                <input className="inputs-form-address" type="text" placeholder="estado" {...register('estado')} />
                <input className="inputs-form-address"  type="text" placeholder="municipio" {...register('municipio')} />
                
                
                <input className="inputs-form-address"  type="text" placeholder="cp" {...register('cp')} />
                <input className="inputs-form-address"  type="text" placeholder="colonia" {...register('colonia')} />
                
                
                <input className="inputs-form-address"  type="text" placeholder="calle" {...register('calle')} />
                <input className="inputs-form-address"  type="number" placeholder="numero de casa" {...register('numerodecasa')} />
                
            

                <input className="inputs-form-address"  type="number" placeholder="telefono" {...register('telefono')} />
                
                <Button type="submit" variant="warning" className="btn-continue-buy" >Continuar con la compra</Button>
            </form>
        </div>
        </>
    )
}

export default FormAddAdress