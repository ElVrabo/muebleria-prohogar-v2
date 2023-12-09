import "./favoriteProducts.css"
import { useContext, useEffect } from "react";
import { productsContext } from "../../../context/productsContext";
import NavbarProfile from "./NavbarProfile";
import { Button } from "react-bootstrap";

const FavoriteProducts = ()=>{
  const{getFavoriteProducts,listFavoriteProducts,deleteFavoriteProduct} = useContext(productsContext)

  useEffect(()=>{
     getFavoriteProducts()
  },[])
  if(listFavoriteProducts.length===0){
    return(
      <>
    <NavbarProfile/>
    <h1 style={{textAlign:"center"}} >No tienes productos favoritos</h1>
    </>
    )
  }
  return (
    <>
    <NavbarProfile/>
    <div className="container-favorite-products">
      {listFavoriteProducts.map((product)=>(
        <div className="card-favorite-products" key={product._id}>
          <img src={product.image} alt="imagen del producto" style={{height:"250px",width:"300px"}} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
          
          <Button variant="warning" style={{color:"#ffffff"}}  onClick={()=>{
             deleteFavoriteProduct(product._id)
             getFavoriteProducts()
          }}>Eliminar de favoritos</Button>
          
        </div>
    ))}</div>
    </>
  )
}

export default FavoriteProducts;