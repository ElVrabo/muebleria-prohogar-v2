import { createContext, useState } from "react";
import { addSellersRequest, deleteSellersRequest, filterSellersRequest, getSellersRequest } from "../api/sellers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)
export const sellersContext = createContext()

export const SellersContextProvider = ({children})=>{

   const [listSellers,setListSellers] = useState([])

   
   const getSellers = async()=>{
    try {
        const res = await getSellersRequest()
        setListSellers(res.data)
    } catch (error) {
    }
   }

   const addSellers = async(seller)=>{
    try {
        const res = await addSellersRequest(seller)
        MySwal.fire({
            title:"Se agrego correctamente el proveedor",
            icon:"success"
        })
    } catch (error) {
        MySwal.fire({
            title:error.response.data.error,
            icon:"error"
        })
    }
   }
   const filterSellers = async (sellerName,inputSeller) => {
   try {
    const res = await filterSellersRequest(sellerName)
    setListSellers(res.data)
   } catch (error) {
    
    await MySwal.fire({
        title:error.response.data.message,
        icon:"error"
    })
    inputSeller.current.value = null
   }
   }
   const deleteSellers = async(id)=>{
      try {
        const res = await deleteSellersRequest(id)
        if(res.status ===200){
            setListSellers(listSellers.filter((seller=>seller._id!==id)))
        }
      } catch (error) {
        
      }
   }
   return (
    <sellersContext.Provider value={{
        listSellers,
        getSellers,
        addSellers,
        filterSellers,
        deleteSellers
    }} >
        {children}
    </sellersContext.Provider>
   )
}