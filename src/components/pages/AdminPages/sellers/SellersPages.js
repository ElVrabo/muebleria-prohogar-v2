import "./sellersPages.css"
import { useContext, useEffect, useRef, useState } from "react"
import SideBar from "../../../common/sideBar/SideBar"
import { providerProductsContext } from "../../../../context/providerProductsContext"
import { Table,Button } from "react-bootstrap"
import { FORMPROVIDERPRODUCTSPAGES } from "../../../../config/routes/path"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import iconDelete from "../../../../assets/icons/borrar.png"

const MySwal = withReactContent(Swal)

const SellersPages = ()=>{
    const [providerName,setProviderName] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const {getProviderProducts,listProviderProducts,filterProviderProduct,deleteProviderProducts} = useContext(providerProductsContext)
    const inputProviderProduct = useRef()
    const navigate = useNavigate()
    useEffect(()=>{
        const loadProviderProducts = async()=>{
            await getProviderProducts()
            /*se actualiza el estado isLoading despues de que me traiga
            los proveedores de productos*/
            setIsLoading(false)
           
        }
        loadProviderProducts()
    },[])

    useEffect(()=>{
        if(!isLoading && listProviderProducts.length === 0){
            showAlert()
        }
       
    },[isLoading,listProviderProducts])

   const showAlert=async()=>{
    const result = await MySwal.fire({
        title:"No hay proveedores",
        icon:"error",
        showCancelButton:true,
        confirmButtonText:"Agregar nuevo proveedor",
        cancelButtonText:"Cerrar"
      })
      /*si result en su propiedad isConfirmed es true, quiere decir que se dio
      click en el confirmButton */
      if(result.isConfirmed){
        navigate(FORMPROVIDERPRODUCTSPAGES)
      }
   }
//    const orderProviderProductsByDate = listProviderProducts.sort((a,b)=>new Date(b.date) - new Date(a.date))
    return (
        <>
       <div className="container-grid" >
        <div className="grid-sidebar">
            <SideBar/>
        </div>
        <div className="grid-table-providers">
            <div className="container-search-provider" >
                <div className="input-search-provider" >
                    <input ref={inputProviderProduct} type="text" placeholder="Busca un proveedor en especifico" value={providerName} onChange={(e)=>{
                        setProviderName(e.target.value)
                    }} />
                    <Button variant="warning" style={{color:"#ffffff",height:"35px"}} onClick={()=>{
                     filterProviderProduct(providerName)
                     inputProviderProduct.current.value = ''
                    }} >Buscar</Button>
                </div>
            </div>
            <Table striped bordered hover size="sm" style={{marginTop:"30px"}}>
      <thead>
        <tr>
          
          <th>Razon_social</th>
          <th>Ubicacion</th>
          <th>Telefono</th>
          <th>Rfc</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       {listProviderProducts.map((provider)=>(
        <tr key={provider._id}>
        <td>{provider.razon_social}</td>
        <td>{provider.address}</td>
        <td>{provider.number}</td>
        <td>{provider.rfc}</td>
        <td>{new Date(provider.date).toLocaleDateString()}</td>
        <td style={{display:"flex",gap:"5px"}}>
            <img src={iconDelete} alt="icono de eliminar" onClick={async()=>{
                await deleteProviderProducts(provider._id)
                MySwal.fire({
                    title:"El proveedor se elimino correctamente",
                    icon:"success"
                })
            }} />
            
        </td>
       
        </tr>
       ))}
        
      </tbody>
    </Table>
        </div>
       </div>
        </>
    )
}
export default SellersPages