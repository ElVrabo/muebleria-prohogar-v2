import "./sellersPages.css"
import { useContext, useEffect, useRef, useState } from "react"
import SideBar from "../../../common/sideBar/SideBar"
import { sellersContext } from "../../../../context/sellersContext"
import { Table,Button } from "react-bootstrap"
import { FORMPROVIDERPRODUCTSPAGES } from "../../../../config/routes/path"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import iconDelete from "../../../../assets/icons/borrar.png"

const MySwal = withReactContent(Swal)

const SellersPages = ()=>{
    const [sellerName,setSellerName] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const {getSellers,listSellers,filterSellers,deleteSellers} = useContext(sellersContext)
    const inputSeller = useRef()
    const navigate = useNavigate()
    useEffect(()=>{
        const loadSellers = async()=>{
            await getSellers()
            /*se actualiza el estado isLoading despues de que me traiga
            los proveedores de productos*/
            setIsLoading(false)
           
        }
        loadSellers()
    },[])

    useEffect(()=>{
        if(!isLoading && listSellers.length === 0){
            showAlert()
        }
       
    },[isLoading,listSellers])

    useEffect(()=>{
      const searchSellers = async ()=>{
        await filterSellers(sellerName,inputSeller)
      }
      searchSellers()
    },[sellerName])

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
                    <input ref={inputSeller} type="text" placeholder="Busca un proveedor en especifico" value={sellerName} onChange={(e)=>{
                        setSellerName(e.target.value)
                    }} />
                    {/* <Button variant="warning" style={{color:"#ffffff",height:"35px"}} onClick={async()=>{
                     await filterSellers(sellerName)
                     inputSeller.current.value = ''
                    }} >Buscar</Button> */}
                </div>
            </div>
           <div className="table-container-sellers" >
           <Table className="table-sellers"  responsive="sm">
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
       {listSellers.map((seller)=>(
        <tr key={seller._id}>
        <td>{seller.razon_social}</td>
        <td>{seller.address}</td>
        <td>{seller.number}</td>
        <td>{seller.rfc}</td>
        <td>{new Date(seller.date).toLocaleDateString()}</td>
        <td style={{display:"flex",gap:"5px"}}>
            <img src={iconDelete} alt="icono de eliminar" onClick={async()=>{
                await deleteSellers(seller._id)
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
       </div>
        </>
    )
}
export default SellersPages