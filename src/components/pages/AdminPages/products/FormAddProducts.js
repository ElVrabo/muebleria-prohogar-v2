import "./formAddProducts.css"
import { Button } from "react-bootstrap"
// import { useForm} from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react"
import { productsContext } from "../../../../context/productsContext"
import { useParams } from "react-router-dom"
import {Spinner} from "react-bootstrap"
import SideBar from "../../../common/sideBar/SideBar"
import Form from 'react-bootstrap/Form';

import iconUploadImage from "../../../../assets/icons/subir.png"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { storage } from "../../../../api/firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
const MySwal = withReactContent(Swal)




const FormAddProducts = ()=>{
    const [productData,setProductData] = useState({
    image:null,
    name:null,
    price:null,
    description:null,
    stock:0,
    category:null,
    })
    const [loading,setLoading] = useState(false)
    const {addProductsOnSale,getProductOnSale,editProductsOnSale} = useContext(productsContext)
    const {id} = useParams()
    const fileRef = useRef()
    const nameRef = useRef()
    const priceRef = useRef()
    const descriptionRef = useRef()
    const stockRef = useRef()
    const categoryRef = useRef()
    

    useEffect(()=>{
        const loadProduct = async ()=>{
            

    /*si hay un parametro id en la url, se hara una peticion para traer el producto con ese id
    y establecer en los inputs los valores de ese producto, este useEffect se ejecuta cuando
    se renderiza por primera vez el componente*/ 
        if(id){
          const product = await getProductOnSale(id)
     
          nameRef.current.value = product.name
          priceRef.current.value = product.price
          descriptionRef.current.value = product.description
          stockRef.current.value = product.stock
          categoryRef.current.value = product.category
        
        }
        }
        loadProduct()
    },[])

    const addNewProduct = async(e)=>{
        e.preventDefault()
        /*Si hay un parametro id en la url, quiere decir que se le dio click al boton editar
        y se hara la peticion para editar, se enviara el id que esta en la url, que hace 
        referencia al id del producto que se desea editar, y el value son los nuevos valores
        que se le asignaran a ese producto*/ 
        if(id){
            let urlImage = ''
            const storageRef = ref(storage, v4())
            await uploadBytes(storageRef, productData.image )
            urlImage = await getDownloadURL(storageRef)
            if(productData.image){
                const editProduct = {
                    image : urlImage,
                    name: nameRef.current.value,
                    price: priceRef.current.value,
                    description: descriptionRef.current.value,
                    stock: stockRef.current.value,
                    category: categoryRef.current.value
                }
                /*Se activa un spinner mientras se hace la peticion post, ya que la funcion es asincrona
                y no bloquea la ejecucion del codigo*/ 
                setLoading(true)
                await editProductsOnSale(id,editProduct)
                setLoading(false)
                return 
            }else{
                MySwal.fire({
                    title:'Debes de cargar una nueva imagen',
                    icon:"error"
                })
            }
           
        }else{
                let urlImage = ''
                if(productData.image && productData.name && productData.price
                    && productData.stock && productData.description && productData.category
                 ){
                    const storageRef = ref(storage, v4())
                    await uploadBytes(storageRef, productData.image )
                    urlImage = await getDownloadURL(storageRef)
                    const newProduct = {
                        image : urlImage,
                        name: productData.name,
                        price: productData.price,
                        description: productData.description,
                        stock: productData.stock,
                        category: productData.category
                }
                 setLoading(true)
                 await addProductsOnSale(newProduct)
                 setLoading(false)
                 return 
                }else{
                    MySwal.fire({
                        title:'Debes de rellenar todos los campos',
                        icon:'error'

                        
                    })
                }
             
               
         
          
    }
        
    }
    
    return (
        <>
        <div className="container-grid" >
            <div className="grid-sidebar">
                <SideBar/>
            </div>
            <div className="grid-add-products">
            
        {/* <Spinner animation="border" /> */}
        <div className="container-add-products"></div>
        {/*encType="multipart/form-data" permite la carga de archivos, es fundamental para que
        el navegador entienda que el formulario puede contener datos binarios (como archivos)*/ }
        <Form className="form-add-products" onSubmit={addNewProduct} encType="multipart/form-data">
            <div className="container-file" >
                <Form.Label className="label-file" >Carga una imagen</Form.Label>
                <Form.Control ref={fileRef} type="file" onChange={(e)=>{
                    setProductData({...productData, image: e.target.files[0]})
                }} />
            </div>
            <div className="container-product-price" >
            <div className="product" >
            <Form.Label>Producto</Form.Label>
        {/*con el onChange de register estamos indicando que el valor del input sea siempre
        minusculas, aunque se escriba con mayusculas*/ }
            <Form.Control ref={nameRef} className="input-product" onChange={(e)=>{
                setProductData({...productData,name:e.target.value})
            }} type="text"  />
            </div>
            <div className="price" >
            <Form.Label>Precio</Form.Label>
            <Form.Control ref={priceRef} className="input-price"  onChange={(e)=>{
                setProductData({...productData,price:e.target.value})
            }} type="number" />
            </div>
            </div>
        
            <Form.Label>Descripcion</Form.Label>
            <Form.Control ref={descriptionRef} className="description"  onChange={(e)=>{
                setProductData({...productData,description:e.target.value})
            }} type="text"  />
            
            {/*Los valores de los 3 inputs se envian al sevidor como un array
            el servidor recibe el array con 3 valores y los envia a la bd
            en la bd se guarda el array en la propiedad specifications
            se le pone 0,1 y 2, para referirse al valor de cada input
            si solo pusieramos specifications, solo se guardaria un valor
            ya que no estamos indicando que valor corresponde a cada posicion del array*/ }
           
            <Form.Label>Disponibles</Form.Label>
            <Form.Control ref={stockRef} className="specifications"  onChange={(e)=>{
                setProductData({...productData,stock:e.target.value})
            }} type="number" />
            <Form.Label>Categoria</Form.Label>
            <Form.Select ref={categoryRef} className="select-category" onChange={(e)=>{
                setProductData({...productData, category: e.target.value})
            }} >
            <option value="" disabled selected hidden>Selecciona una categoría</option>
                <option value="Linea blanca" >Linea blanca</option>
                <option value="Electronica">Electronica</option>
                <option value="Muebles">Muebles</option>
            </Form.Select>
            <Button variant="warning" type="submit" style={{color:"#fff",marginTop:"10px"}}>{
                loading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden='true' /> <span>Cargando...</span></> : 'Añadir producto'
            }</Button>
        </Form>
            </div>
        </div>
      
        </>
    )
}
export default FormAddProducts