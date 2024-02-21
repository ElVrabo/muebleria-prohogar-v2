import "./productsDetails.css"
import React,{ useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { productsContext } from "../../../context/productsContext"
import { Button } from "react-bootstrap"
import { paymentRequest
 } from "../../../api/payment"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)


const ProductsDetailsPages = ()=>{
    const [productSelected,setProductSelected] = useState()
    const {getProductOnSale,getProductsOnSale,listProductsOnSale,addProducts,createReview } = useContext(productsContext)
    const {register,handleSubmit,reset} = useForm()
    const {ProductID} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        const loadProduct = async()=>{
            if(ProductID){
                const product = await getProductOnSale(ProductID)
                setProductSelected(product)
            }
        }
        loadProduct()

    },[])
    useEffect(()=>{
        getProductsOnSale()
    },[])
    return (
        <>
        {productSelected&&(
            <div className="container-details-product">
                <div className="body-details-product" >
            <img className="image-product" src={`http://localhost:4000/api/${productSelected.image}`}  />
            <div className="details-products">
            <h1 >{productSelected.name[0].toUpperCase() + productSelected.name.slice(1).toLowerCase()}</h1>
                  <h4>${productSelected.price}</h4>
                  <p >{productSelected.description}</p>
                  <h5>Mas detalles de este producto</h5>
                  <ul>
                    <li >{productSelected.specifications[0]}</li>
                    <li >{productSelected.specifications[1]}</li>
                    <li >{productSelected.specifications[2]}</li>
                  </ul>
                  <div className="btns-product">
            <Button variant="warning" className="btn-buy" onClick={()=>{
                navigate(`/formAddAddress/${productSelected._id}`)
                //  paymentRequest(productSelected).then((res)=>window.location.href=res.data.response.body.init_point)
            }} >Comprar ahora</Button>
            <Button variant="light" className="btn-add-to-cart" onClick={async()=>{
                await addProducts(productSelected)
                MySwal.fire({
                    title:"El producto se agrego al carrito",
                    icon:"success"
                })
            }} >Agregar al carrito</Button>
           
            </div>
            </div>
    
            </div>
            </div>
        )}
        
        </>
    )
}
export default ProductsDetailsPages