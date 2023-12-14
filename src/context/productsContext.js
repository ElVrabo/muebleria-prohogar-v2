import { createContext, useEffect, useState } from "react";
import { addFavoriteProductsRequest, addProductsOnSaleRequest, addProductsRequest, deleteFavoriteProductsRequest, deleteProductsOnSaleRequest, deleteProductsRequest, editProductsOnSaleRequest, filterProductsCatalogRequest, getFavoriteProductsRequest, getProductOnSaleRequest, getProductsOnSaleRequest, getProductsRequest, searchProductsOnSaleRequest } from "../api/products";


export const productsContext = createContext()

export const ProductsContextProvider = ({children})=>{
  // const [numberProducts,setNumberProducts] = useState()
    const [listProductsCart,setListProductsCart] = useState([])
    const [listProductsOnSale,setListProductsOnSale] = useState([])
    const [listFavoriteProducts,setListFavoriteProducts] = useState([])
    const [totalPrice,setTotalPrice] = useState()
    const [productNotFound,setProductNotFound] = useState()
    const [alertProductNotFound,setAlertProductNotFound] = useState()

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
     } catch (error) {
      
     }
    }
    const deleteProductsOnSale = async(id)=>{
try {
  const res = await deleteProductsOnSaleRequest(id)
  if(res.status === 200){
    setListProductsOnSale(listProductsOnSale.filter((product=>product._id !== id)))
  }
} catch (error) {
  
}
    }
    const editProductsOnSale = async (id,product)=>{
      try {
         const res = await editProductsOnSaleRequest(id,product)
        
      } catch (error) {
      
      }
    }
    const filterProductsName = async(value) =>{
      try {
        const res = await searchProductsOnSaleRequest(value)
        setListProductsOnSale(res.data)
         setProductNotFound(false)
      } catch (error) {
        setProductNotFound(error.response.data.error)
      }
    }
    const filterProductsCatalog = async(data) =>{
      try {
        const res = await filterProductsCatalogRequest(data)
        setListProductsOnSale(res.data)
        setAlertProductNotFound(false)
      } catch (error) {
        setAlertProductNotFound(error.response.data.error)
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
        filterProductsCatalog,
        productNotFound,
        setProductNotFound,
        alertProductNotFound,
        setAlertProductNotFound
        // numberProducts
        
    }}>
        {children}
    </productsContext.Provider>
)
}