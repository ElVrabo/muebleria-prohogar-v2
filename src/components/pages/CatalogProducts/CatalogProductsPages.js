import "./catalogProducts.css"
import React,{ useContext, useEffect, useRef, useState} from "react"
import { productsContext } from "../../../context/productsContext.js"
import { Navigation } from "../../common/nav/Navigation.js"
import {  Button } from "react-bootstrap"
import ProductsCard from "./ProductsCard.js"





const CatalogProductsPages = ()=>{
    const [nameProduct,setNameProduct] = useState(null)
    const {getProductsOnSale,listProductsOnSale,filterProductsName} = useContext(productsContext)
    const inputNameProduct = useRef()
    useEffect(()=>{
        getProductsOnSale()
    },[])

  

    const handleInputProduct = (e)=>{
        setNameProduct(e.target.value)
    }
  
    return (
        <>
        <Navigation />
        <div className="search-products" >
            <input ref={inputNameProduct} type="text" onChange={handleInputProduct} />
            <Button variant="warning" style={{color:"#ffffff"}} onClick={async()=>{
                await filterProductsName(nameProduct, inputNameProduct)
            }} >Buscar</Button>
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