import "./catalogProducts.css"
import React,{ useContext, useEffect, useState} from "react"
import { productsContext } from "../../../context/productsContext.js"
import { Navigation } from "../../common/nav/Navigation.js"
import { Alert, Button } from "react-bootstrap"
import ProductsCard from "./ProductsCard.js"
// import { get } from "http"




const CatalogProductsPages = ()=>{
    const [nameProduct,setNameProduct] = useState()
    const {getProductsOnSale,listProductsOnSale,filterProductsCatalog,alertProductNotFound,setAlertProductNotFound} = useContext(productsContext)
    useEffect(()=>{
        getProductsOnSale()
    },[])

 

    useEffect(()=>{
        setTimeout(()=>{
            setAlertProductNotFound(false)
        },4000)
    },[alertProductNotFound])

    const handleInputProduct = (e)=>{
        setNameProduct(e.target.value)
    }
  
    return (
        <>
        <Navigation />
        <div className="search-products" >
            <input type="text" onChange={handleInputProduct} />
            <Button variant="warning" style={{color:"#ffffff"}} onClick={()=>{
                filterProductsCatalog(nameProduct)
            }} >Buscar</Button>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
          {alertProductNotFound && (
            <Alert variant="danger" >{alertProductNotFound}</Alert>
          )}
        </div>
          <div className="container-products">
          {listProductsOnSale.map((product)=>(
              <ProductsCard key={product._id} product={product} />
          ))}
          </div>
        </>
    )
}

export default CatalogProductsPages