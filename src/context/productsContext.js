import { createContext, useState } from "react";
import { addFavoriteProductsRequest, addProductsOnSaleRequest, addProductsRequest, createReviewRequest, deleteFavoriteProductsRequest, deleteProductsOnSaleRequest, deleteProductsRequest, editProductsOnSaleRequest, filterProductsCatalogRequest, filterProductsNameRequest, getFavoriteProductsRequest, getProductOnSaleRequest, getProductsOnSaleRequest, getProductsRequest, searchProductsOnSaleRequest } from "../api/products";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)

export const productsContext = createContext()

export const ProductsContextProvider = ({children})=>{
  // const [numberProducts,setNumberProducts] = useState()
    const [listProductsCart,setListProductsCart] = useState([])
    const [listProductsOnSale,setListProductsOnSale] = useState([])
    const [listFavoriteProducts,setListFavoriteProducts] = useState([])
    const [totalPrice,setTotalPrice] = useState()
   

    const getProducts = async ()=>{
  try {
    const res = await getProductsRequest()
    setListProductsCart(res.data)
    // setNumberProducts(listProductsCart.length)
  } catch (error) {
  
  }
    }
    const addProducts = async(data)=>{
      try {
       const res = await addProductsRequest(data)
      
      } catch (error) {
      
      }
   
       }
       const deleteProduct = async(id) =>{
         try {
           const res = await deleteProductsRequest(id)
           if(res.status===200){
             setListProductsCart(listProductsCart.filter((product)=>product._id!==id))
           }
         } catch (error) {
           
         }
       }
    const getFavoriteProducts = async()=>{
      try {
        const res = await getFavoriteProductsRequest()
         setListFavoriteProducts(res.data)
      } catch (error) {
        
      }
    }
    const addFavoriteProducts = async(data)=>{
      try {
        const res = await addFavoriteProductsRequest(data)
      } catch (error) {
        
      }
    }
    const deleteFavoriteProduct = async (id) =>{
      try {
        const res = await deleteFavoriteProductsRequest(id)
        if(res.status ===200){
          setListFavoriteProducts(listFavoriteProducts.filter((product)=>product._!==id))
        }
      } catch (error) {
        
      }
    }
    
    const getProductsOnSale = async() =>{
  try {
    const res = await getProductsOnSaleRequest()
    setListProductsOnSale(res.data)
    
  } catch (error) {
    
  }
    }
    const getProductOnSale = async(id)=>{
      try {
         const res = await getProductOnSaleRequest(id)
         return res.data
      } catch (error) {
         
      }
    }

    const addProductsOnSale = async(data)=>{
     try {
      const res = await addProductsOnSaleRequest(data)
      MySwal.fire({
          title:res.data.message,
          icon:"success"
      })
     } catch (error) {
    
      
     }
    //  console.log(error)
    }
    const deleteProductsOnSale = async(id)=>{
try {
  const res = await deleteProductsOnSaleRequest(id)
   
  if(res.status === 200){
    setListProductsOnSale(listProductsOnSale.filter((product=>product._id !== id)))
    MySwal.fire({
      title:res.data.message,
      icon:"success"
    })
  }
 
} catch (error) {
  
}
    }
    const editProductsOnSale = async (id,product)=>{
      try {
         const res = await editProductsOnSaleRequest(id,product)
         MySwal.fire({
          title:res.data.message,
          icon:"success"
         })
      } catch (error) {
      
      }
    }
    const filterProductsName = async(productName,inputProduct) =>{
      try {
       if(productName){
        const res = await filterProductsNameRequest(productName)
        setListProductsOnSale(res.data)
        inputProduct.current.value = null
        return
       }
       MySwal.fire({
        title:"Escibe el producto a buscar",
        icon:"error"
       })
       return
        
      } catch (error) {
        await MySwal.fire({
          title:error.response.data.error,
          icon:'error'
        })
        if(inputProduct){
          inputProduct.current.value = null
          return
        }
       
      
      }
    }

    
    const totalPriceProducts = ()=>{
        setTotalPrice(listProductsCart.reduce((total,product)=>{
          return total + product.price
        },0))
    }
    
return (
    <productsContext.Provider value={{
        getProducts,
        addProducts,
        deleteProduct,
        totalPriceProducts,
        totalPrice,
        listProductsCart,
        getFavoriteProducts,
        addFavoriteProducts,
        listFavoriteProducts,
        deleteFavoriteProduct,
        getProductsOnSale,
        addProductsOnSale,
        listProductsOnSale,
        deleteProductsOnSale,
        editProductsOnSale,
        filterProductsName,
        getProductOnSale,
        
        // numberProducts
        
    }}>
        {children}
    </productsContext.Provider>
)
}