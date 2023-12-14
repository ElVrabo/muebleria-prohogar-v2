import "./productsDetails.css"
import React,{ useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { productsContext } from "../../../context/productsContext"
import { Button } from "react-bootstrap"
import { paymentRequest
 } from "../../../api/payment"

 interface productSelectedProps{
    image:string,
    name:string,
    price:number,
    description:string,
    specifications:string[],

 }

const ProductsDetailsPages = ()=>{
    const [productSelected,setProductSelected] = useState<productSelectedProps>()
    const {getProductOnSale,addProducts} = useContext(productsContext)
    const {ProductID} = useParams()
    useEffect(()=>{
        const loadProduct = async()=>{
            if(ProductID){
                const product = await getProductOnSale(ProductID)
                setProductSelected(product)
            }
        }
        loadProduct()

    },[])
    return (
        <>
        {productSelected&&(
            <div className="container-details-product">
                <div className="body-details-product" >
            <img className="image-product" src={`http://localhost:4000/api/${productSelected.image}`}  />
            <div className="details-products">
            <h1 >{productSelected.name}</h1>
                  <h2>${productSelected.price}</h2>
                  <p >{productSelected.description}</p>
                  <h5>Mas detalles de este producto</h5>
                  <ul>
                    <li >{productSelected.specifications[0]}</li>
                    <li >{productSelected.specifications[1]}</li>
                    <li >{productSelected.specifications[2]}</li>
                  </ul>
                  <div className="btns-product">
            <Button variant="warning" className="btn-buy" onClick={()=>{
                 paymentRequest(productSelected).then((res)=>window.location.href=res.data.response.body.init_point)
            }} >Comprar ahora</Button>
            <Button variant="light" className="btn-add-to-cart" onClick={()=>{
                addProducts(productSelected)
            
            }} >Agregar al carrito</Button>
            <Button variant="light" className="btn-add-to-favorite" onClick={()=>{
                 
            }}>Agregar a favoritos</Button>
            </div>
            </div>
    
            </div>
            </div>
        )}
        </>
    )
}
export default ProductsDetailsPages