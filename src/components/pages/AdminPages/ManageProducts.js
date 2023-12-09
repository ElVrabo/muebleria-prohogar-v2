import "./manageProducts.css"
import { Button, Table } from "react-bootstrap"
import NavbarAdmin from "./NavbarAdmin"
import React,{ useContext } from "react"
import { productsContext } from "../../../context/productsContext"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"


const ManageProducts = ()=>{
    const [searchProduct,setSearchProduct] = useState('')
    const {getProductsOnSale,listProductsOnSale,deleteProductsOnSale,filterProductsName,productNotFound,setProductNotFound} = useContext(productsContext)
    const navigate = useNavigate()

   
    useEffect(()=>{
        getProductsOnSale()
    },[])

    useEffect(()=>{
      setTimeout(()=>{
        setProductNotFound(false)
      },4000)
    },[productNotFound])


    const orderProductsByDate = listProductsOnSale.sort((a,b)=>new Date(b.date)- new Date(a.date))



    
    return (
        <>
        <NavbarAdmin/>
        <h3 style={{textAlign:"center",marginTop:"50px"}}>Mi inventario de productos</h3>
        <div className="search-product">
          <input type="text" placeholder="Busca un producto en especifico" onChange={(e)=>{
            /*Todo lo que escribamos en el input se convertia a minusculas*/ 
            setSearchProduct(e.target.value)
          }}/>
          <Button variant="warning" className="btn-search-product" onClick={()=>{
             filterProductsName(searchProduct)
             
          }}>Buscar</Button>
        </div>
        <div className="product-not-found">
          {productNotFound && (
            <Alert variant="danger">{productNotFound}</Alert>
          )}
        </div>
        <Table striped bordered hover size="sm" style={{marginTop:"30px"}}>
      <thead>
        <tr>
          
          <th>Producto</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Disponibles</th>
          <th>Categoria</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       {orderProductsByDate.map((product)=>(
        <tr key={product._id}>
        <td>{`${product.name}`.toLowerCase()}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td>{product.stock}</td>
        <td>{product.category}</td>
        <td>{new Date(product.date).toLocaleDateString()}</td>
        <td style={{display:"flex",gap:"5px"}}>
            <Button variant="light" style={{border:"2px solid orange"}} onClick={()=>{
            deleteProductsOnSale(product._id)
            getProductsOnSale()
            }}>Eliminar</Button>
            <Button style={{color:"#ffffff"}} variant="warning" onClick={()=>{
            navigate(`/manageProducts/${product._id}`)
        }}>Editar</Button>
        </td>
       
        </tr>
       ))}
        
      </tbody>
    </Table>
        </>
    )
}   
export default ManageProducts