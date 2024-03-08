import "./productsCard.css"
import { Link } from "react-router-dom"
// import { paymentRequest } from "../../../api/payment"
import React from "react"



const ProductsCard = ({product,key}) =>{
    return (
        <>
        <Link  to={`/catalog/${product._id}`} style={{textDecoration:"none",color:"black"}}>
        <div key={key} className="body-products" >
            <img src={`https://api-dashboard-v8.vercel.app/api/${product.image}`} alt="imagen del producto" />
            <h2>{product.name[0].toUpperCase() + product.name.slice(1).toLowerCase()}</h2>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            {/* <p>Este producto se agrego el: {new Date(product.date).toLocaleDateString()}</p> */}
            {/* <p style={{color:product.stock ===1 ? 'red' : 'black'}} >{product.stock===1 ? 'Solo queda un producto disponible':`Quedan ${product.stock} disponibles`}</p> */}
            {/* <div className="btns-card-products" >
            <Button variant="warning" style={{color:"#ffffff", width:"250px"}} onClick={()=>{
                    navigate(`/formAddAddress/${product._id}`)
                    //  paymentRequest(product).then((res)=>window.location.href=res.data.response.body.init_point)
                }}  >Comprar ahora</Button>
                <Button variant="light" style={{width:"250px",border:"2px solid orange"}}  onClick={()=>{
                    navigate(`/catalog/${product._id}`)
                }} >Ver detalles</Button>
            </div> */}
        </div>
        </Link>
        </>
    )
}

export default ProductsCard