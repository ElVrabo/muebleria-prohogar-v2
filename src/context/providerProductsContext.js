import { createContext, useState } from "react";
import { addProviderProductsRequest, deleteProviderProductsRequest, filterProviderProductRequest, getProvidersProductsRequest } from "../api/providerProducts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)
export const providerProductsContext = createContext()

export const ProviderProductsContextProvider = ({children})=>{

   const [listProviderProducts,setListProviderProducts] = useState([])

   
   const getProviderProducts = async()=>{
    try {
        const res = await getProvidersProductsRequest()
        setListProviderProducts(res.data)
    } catch (error) {
    }
   }

   const addProviderProducts = async(provider)=>{
    try {
        const res = await addProviderProductsRequest(provider)
        MySwal.fire({
            title:"Se agrego el proveedor",
            icon:"success"
        })
    } catch (error) {
        MySwal.fire({
            title:error.response.data.error,
            icon:"error"
        })
    }
   }
   const filterProviderProduct = async (value) => {
   try {
    const res = await filterProviderProductRequest(value)
    setListProviderProducts(res.data)
   } catch (error) {
    console.log(error)
    MySwal.fire({
        title:error.response.data.error,
        icon:"error"
    })
   }
   }
   const deleteProviderProducts = async(id)=>{
      try {
        const res = await deleteProviderProductsRequest(id)
        if(res.status ===200){
            setListProviderProducts(listProviderProducts.filter((provider=>provider._id!==id)))
            MySwal.fire({
                title:res.data.message,
                icon:"success"
            })
        }
      } catch (error) {
        
      }
   }
   return (
    <providerProductsContext.Provider value={{
        listProviderProducts,
        getProviderProducts,
        addProviderProducts,
        filterProviderProduct,
        deleteProviderProducts
    }} >
        {children}
    </providerProductsContext.Provider>
   )
}