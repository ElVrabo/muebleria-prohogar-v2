import React,{ useCallback, useContext, useEffect, useState} from "react"
import { productsContext } from "../../../context/productsContext.js"
import ProductsCard from "./ProductsCard.js"
import { Button } from "react-bootstrap"



const CartPages = ()=>{
  const [isLoading,setIsLoading] = useState()
    const {getProducts,listProductsCart,totalPrice,totalPriceProducts} = useContext(productsContext)
    useEffect(()=>{
      const loadProductsCart = async()=>{
        setIsLoading(true)
        await getProducts()
        setIsLoading(false)
    }
    loadProductsCart()
    },[])

   useEffect(()=>{
    totalPriceProducts()
   },[totalPrice])

    const currentPriceProduct = (unityProduct,priceProduct)=>{
           return unityProduct * priceProduct  
    }

    if(!isLoading && listProductsCart.length ===0){
    return <h1 style={{textAlign:"center"}} >No hay productos en el carrito</h1>
    }

    return (
        <>
        <div style={{display:"flex", flexDirection:"column",marginTop:"35px",gap:"35px"}} className="container-products-shopping" >
           {listProductsCart.map((product)=>(
             <>
             <ProductsCard 
               product={product}
               key={product._id}
               currentPriceProduct={currentPriceProduct}
             />
              
             </>
           ))}
        </div>
          <div style={{marginTop:"10px", display:"flex",flexDirection:"column",alignItems:"center"}} >
            <p>{totalPrice>0 ? `Tu total es de ${totalPrice}`:''}</p>
            <Button variant="warning" style={{color:"#ffffff"}} onClick={()=>{
              totalPriceProducts()
            }} >
              Ver total a pagar
              </Button>
          </div>
        </>
    )
}
export default CartPages