import { Button } from "react-bootstrap"
import "./productsCard.css"
import React,{ useContext,useEffect,useState } from "react"
import { productsContext } from "../../../context/productsContext"



/*El componenete recibe product y key de la interface ProductCardProps*/ 
const ProductsCard = ({product,key,currentPriceProduct})=>{

    const [productUnity,setProductUnity] = useState(1)
    const {getProducts,deleteProduct} = useContext(productsContext)

   

 

    return (
        <>
         <div key={key} className="body-list-products-cart" >
            <div className="img-product-cart" >
               <img src={`http://localhost:4000/api/${product.image}`} />
               <h5>{product.description}</h5> 
            </div>
           <div className="unity-product-cart">
                <input type="number" onChange={(e)=>setProductUnity(e.target.value)} value={productUnity} />
            </div> 
            <div className="price-product-cart" >
                <h2 >${currentPriceProduct(productUnity,product.price)}</h2>
            </div>
            <div className="btn-delete-product-cart">
                <Button variant="warning" onClick={()=>{
                    deleteProduct(product._id)
                    getProducts()
                }} >Eliminar</Button>
            </div>
         </div>
        </>
    )
}

export default ProductsCard