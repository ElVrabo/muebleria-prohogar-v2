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
          await paymentRequest(productPay).then((res)=>window.location.href=res.data.response.body.init_point)
    })

    return (
        <div className="container-form-address" >
            <form className="form-address" onSubmit={sendAddress} >
                <input type="text" placeholder="estado" {...register('estado')} />
                <input type="text" placeholder="municipio" {...register('municipio')} />
                <input type="text" placeholder="cp" {...register('cp')} />
                <input type="text" placeholder="colonia" {...register('colonia')} />
                <input type="text" placeholder="calle" {...register('calle')} />
                <input type="text" placeholder="numero de casa" {...register('numerodecasa')} />
                <input type="text" placeholder="telefono" {...register('telefono')} />
                <Button type="submit" variant="warning" style={{color:"#ffffff"}} >Continuar con la compra</Button>
            </form>
        </div>
    )
}

export default FormAddAdress