import "./formAddSellers.css"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { sellersContext } from "../../../../context/sellersContext"
import SideBar from "../../../common/sideBar/SideBar"
import { Button } from "react-bootstrap"

const FormAddSellers = ()=>{
    const {addSellers} = useContext(sellersContext)
    const {register,handleSubmit,reset} = useForm()

    const createSeller = handleSubmit(async(seller)=>{
          await addSellers(seller)
          reset()
    }) 
    
    return (
        <>
         <div className="container-grid">
            <div className="grid-sidebar" >
                <SideBar/>
            </div>
            <div className="grid-form-add-provider" >
           <form className="form-provider-products" onSubmit={createSeller} >
                <div className="inputs-form-provider-products" >
                <div className="container-name-razon-social">
                    <div className="provider-name">
                     <label>Provedor</label>
                    <input type="text" {...register('name')} />
                    </div>
                    <div className="razon-social" >
                        <label>Razon social</label>
                     <input type="text" {...register('razon_social')} />
                    </div>
                </div>
                <div className="container-address-number" >
                    <div className="address">
                        <label>Direccion</label>
                        <input type="text" {...register('address')} />
                    </div>
                    <div className="number" >
                        <label>Telefono</label>
                        <input type="text" {...register('number')} />
                    </div>
                </div>
                
                <div className="container-rfc-gmail">
                    <div className="rfc">
                        <label>Rfc</label>
                        <input type="text" {...register('rfc')} />
                    </div>
                    <div className="gmail" >
                        <label>Correo</label>
                        <input type="text" {...register('gmail')} />
                    </div>
                </div>
              
            
                <div className="btn-add-provider">
                <Button variant="warning" type="submit" style={{color:"#ffffff"}} >Agregar proveedor</Button>
                </div>
                </div>
            </form>
           
          
            </div>
         </div>
        </>
    )
}
export default FormAddSellers