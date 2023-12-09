import "./productsCard.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
// import { paymentRequest } from "../../../api/payment"
import React from "react"

interface ProductCardProps{
    product:{
        _id:string,
        image:string,
        name:string,
        description:string,
        price:number,
        date: Date,
        stock:number
    },
    key:string
}

const ProductsCard = ({product,key}:ProductCardProps) =>{
    const navigate = useNavigate()
    return (
        <>
        <div key={key} className="body-products" >
            <img src={`http://localhost:4000/api/${product.image}`} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h2>${product.price}</h2>
            <p>Este producto se agrego el: {new Date(product.date).toLocaleDateString()}</p>
            <p style={{color:product.stock ===1 ? 'red' : 'black'}} >{product.stock===1 ? 'Solo queda un producto disponible':`Quedan ${product.stock} disponibles`}</p>
            <div className="btns-card-products" >
            <Button variant="warning" style={{color:"#ffffff", width:"250px"}} onClick={()=>{
                    navigate(`/formAddAddress/${product._id}`)
                    //  paymentRequest(product).then((res)=>window.location.href=res.data.response.body.init_point)
                }}  >Comprar ahora</Button>
                <Button variant="light" style={{width:"250px",border:"2px solid orange"}}  onClick={()=>{
                    navigate(`/catalog/${product._id}`)
                }} >Ver detalles</Button>
            </div>
        </div>
        </>
    )
}

export default ProductsCard