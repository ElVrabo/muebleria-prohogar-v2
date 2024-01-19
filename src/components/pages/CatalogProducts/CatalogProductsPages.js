import "./catalogProducts.css"
import React,{ useContext, useEffect, useState} from "react"
import { productsContext } from "../../../context/productsContext.js"
import { Navigation } from "../../common/nav/Navigation.js"
import {  Button } from "react-bootstrap"
import ProductsCard from "./ProductsCard.js"





const CatalogProductsPages = ()=>{
    const [nameProduct,setNameProduct] = useState()
    const {getProductsOnSale,listProductsOnSale,filterProductsName} = useContext(productsContext)
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
            <input type="text" onChange={handleInputProduct} />
            <Button variant="warning" style={{color:"#ffffff"}} onClick={async()=>{
                await filterProductsName(nameProduct)
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