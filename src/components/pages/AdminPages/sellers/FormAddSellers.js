import "./formAddSellers.css"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { sellersContext } from "../../../../context/sellersContext"
import SideBar from "../../../common/sideBar/SideBar"
import { Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';

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
           <Form className="form-provider-products" onSubmit={createSeller} >
                <div className="inputs-form-provider-products" >
                <div className="container-name-razon-social">
                    <div className="provider-name">
                     <Form.Label>Provedor</Form.Label>
                    <Form.Control type="text" {...register('name')} />
                    </div>
                    <div className="razon-social" >
                        <Form.Label>Razon social</Form.Label>
                     <Form.Control type="text" {...register('razon_social')} />
                    </div>
                </div>
                <div className="container-address-number" >
                    <div className="address">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control type="text" {...register('address')} />
                    </div>
                    <div className="number" >
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" {...register('number')} />
                    </div>
                </div>
                
                <div className="container-rfc-gmail">
                    <div className="rfc">
                        <Form.Label>Rfc</Form.Label>
                        <Form.Control type="text" {...register('rfc')} />
                    </div>
                    <div className="gmail" >
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="text" {...register('gmail')} />
                    </div>
                </div>
              
            
                <div className="btn-add-provider">
                <Button variant="warning" type="submit" style={{color:"#ffffff"}} >Agregar proveedor</Button>
                </div>
                </div>
            </Form>
           
          
            </div>
         </div>
        </>
    )
}
export default FormAddSellers