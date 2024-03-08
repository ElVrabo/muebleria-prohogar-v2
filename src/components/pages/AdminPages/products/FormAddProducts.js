import "./formAddProducts.css"
import { Button } from "react-bootstrap"
import { useForm} from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react"
import { productsContext } from "../../../../context/productsContext"
import { useParams } from "react-router-dom"
import {Spinner} from "react-bootstrap"
import SideBar from "../../../common/sideBar/SideBar"
import iconUploadImage from "../../../../assets/icons/subir.png"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)




const FormAddProducts = ()=>{
    const [image,setImage] = useState()
    const [loading,setLoading] = useState(false)
    const {addProductsOnSale,getProductOnSale,editProductsOnSale} = useContext(productsContext)
    const {register,handleSubmit,reset,setValue} = useForm()
    const {id} = useParams()
    

    useEffect(()=>{
        const loadProduct = async ()=>{
    /*si hay un parametro id en la url, se hara una peticion para traer el producto con ese id
    y establecer en los inputs los valores de ese producto, este useEffect se ejecuta cuando
    se renderiza por primera vez el componente*/ 
        if(id){
          const product = await getProductOnSale(id)
          setValue('name',product.name)
          setValue('price',product.price)
          setValue('description',product.description)
          setValue('specifications[0]',product.specifications[0])
          setValue('specifications[1]',product.specifications[1])
          setValue('specifications[2]',product.specifications[2])
          setValue('stock',product.stock)
          
        }
        }
        loadProduct()
    },[])

    const addNewProduct = handleSubmit(async(value)=>{
        /*Si hay un parametro id en la url, quiere decir que se le dio click al boton editar
        y se hara la peticion para editar, se enviara el id que esta en la url, que hace 
        referencia al id del producto que se desea editar, y el value son los nuevos valores
        que se le asignaran a ese producto*/ 
        if(id){
            const formData = new FormData()
            formData.append('name',value.name)
            formData.append('price',value.price)
            formData.append('description',value.description)
            formData.append('stock',value.stock)
            formData.append('category',value.category)
            /*Se activa un spinner mientras se hace la peticion post, ya que la funcion es asincrona
            y no bloquea la ejecucion del codigo*/ 
            setLoading(true)
            await editProductsOnSale(id,formData)
            setLoading(false)
            reset()
        }else{
            /*Si no hay ningun parametro, es pq se creara un productos*/ 
        const formData = new FormData()
        
        formData.append('name',value.name)
        formData.append('price',value.price)
        formData.append('description',value.description)
        formData.append('stock',value.stock)
        formData.append('category',value.category)
        if(  !value.name || !value.price || !value.description  || !value.stock || !value.category ){
            await MySwal.fire({
                title:"Debes rellenar todos los campos",
                icon:"error"
            })
            reset()
            return 
            
        }
       
        setLoading(true)
        await addProductsOnSale(formData)
        /*Una vez completada la peticion, se muestra la alerta y se oculta el spinner*/ 
        setLoading(false)
        /*Funcion de reac-hook-form para restablecer los valores de los inputs*/ 
        reset()
        }
        
    })
    
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
        <form className="form-add-products" onSubmit={addNewProduct} encType="multipart/form-data">
            <div className="container-product-price" >
            <div className="product" >
            <label>Producto</label>
        {/*con el onChange de register estamos indicando que el valor del input sea siempre
        minusculas, aunque se escriba con mayusculas*/ }
            <input className="input-product" {...register('name',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text"  />
            </div>
            <div className="price" >
            <label>Precio</label>
            <input className="input-price" {...register('price')} type="number" />
            </div>
            </div>
        
            <label>Descripcion</label>
            <input className="description"  {...register('description',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text"  />
            
            {/*Los valores de los 3 inputs se envian al sevidor como un array
            el servidor recibe el array con 3 valores y los envia a la bd
            en la bd se guarda el array en la propiedad specifications
            se le pone 0,1 y 2, para referirse al valor de cada input
            si solo pusieramos specifications, solo se guardaria un valor
            ya que no estamos indicando que valor corresponde a cada posicion del array*/ }
           
            <label>Disponibles</label>
            <input className="specifications"  {...register('stock')} type="number" />
            <label>Categoria</label>
            <select className="select-category" {...register('category')} >
            <option value="" disabled selected hidden>Selecciona una categoría</option>
                <option value="Linea blanca" >Linea blanca</option>
                <option value="Electronica">Electronica</option>
                <option value="Muebles">Muebles</option>
            </select>
            <Button variant="warning" type="submit" style={{color:"#fff",marginTop:"10px"}}>{
                loading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden='true' /> <span>Cargando...</span></> : 'Añadir producto'
            }</Button>
        </form>
            </div>
        </div>
      
        </>
    )
}
export default FormAddProducts