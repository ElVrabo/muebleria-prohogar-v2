import "./catalogProducts.css"
import React,{ useContext, useEffect, useState} from "react"
import { productsContext } from "../../../context/productsContext"
import { Navigation } from "../../common/nav/Navigation"
import { Alert } from "react-bootstrap"
import ProductsCard from "./ProductsCard.tsx"
import { get } from "http"


interface Product{
    _id:string,
        image:string,
        name:string,
        description:string,
        price:number,
        date: Date,
        stock:number
}

const CatalogProductsPages = ()=>{
    const {getProductsOnSale,listProductsOnSale,filterProductsCategory,categoryNotFound,setCategoryNotFound} = useContext(productsContext)
    useEffect(()=>{
        getProductsOnSale()
    },[])

 

    useEffect(()=>{
        setTimeout(()=>{
            setCategoryNotFound(false)
        },4000)
    },[categoryNotFound])

  
    return (
        <>
        <Navigation />
        <div className="search-category" style={{display:"flex",justifyContent:"center",gap:"5px",marginTop:"20px"}}>
            <label>Busca por categoria:</label>
            <select onChange={async(e)=>{
                await filterProductsCategory(e.target.value)
            }} >
                <option value='Linea blanca'>Linea blanca</option>
                <option value='Electronica'>Electronica</option>
                <option value='Muebles'>Muebles</option>
            </select>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
          {categoryNotFound && (
            <Alert variant="danger" >{categoryNotFound}</Alert>
          )}
        </div>
          <div className="container-products">
          {listProductsOnSale.map((product:Product)=>(
              <ProductsCard key={product._id} product={product} />
          ))}
          </div>
        </>
    )
}

export default CatalogProductsPages