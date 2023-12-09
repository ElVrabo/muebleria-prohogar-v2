import "./addProducts.css"
import { Button } from "react-bootstrap"
import { useForm} from "react-hook-form"
import NavbarAdmin from "./NavbarAdmin"
import React,{ useContext, useEffect, useState } from "react"
import { productsContext } from "../../../context/productsContext"
import { useParams } from "react-router-dom"
import {Spinner} from "react-bootstrap"
import { Alert } from "react-bootstrap"




const FormAddProducts = ()=>{
    const [image,setImage] = useState()
    const [loading,setLoading] = useState(false)
    const [showAlert,setShowAlert] = useState(false)
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

    useEffect(()=>{
        /*Despues de 5 segundos de que la alerta este en true, cambia a false para ocultarla.
        Este useEffect se ejecuta cuando cambia showAlert, es decir cuando se le de click al btn
        que cambia el estado de showAlert*/
        setTimeout(()=>{
            setShowAlert(false)
        },5000)
    },[showAlert])

   

    const addNewProduct = handleSubmit(async(value)=>{
        /*Si hay un parametro id en la url, quiere decir que se le dio click al boton editar
        y se hara la peticion para editar, se enviara el id que esta en la url, que hace 
        referencia al id del producto que se desea editar, y el value son los nuevos valores
        que se le asignaran a ese producto*/ 
        if(id){
            const formData = new FormData()
            formData.append('image',value.image[0])
            formData.append('name',value.name)
            formData.append('price',value.price)
            formData.append('description',value.description)
            formData.append('specifications[0]',value.specifications[0])
            formData.append('specifications[1]',value.specifications[1])
            formData.append('specifications[2]',value.specifications[2])
            formData.append('stock',value.stock)
            formData.append('category',value.category)
            /*Se activa un spinner mientras se hace la peticion post, ya que la funcion es asincrona
            y no bloquea la ejecucion del codigo*/ 
            setLoading(true)
            await editProductsOnSale(id,formData)
            setShowAlert(true)
            setLoading(false)
            reset()
        }else{
            /*Si no hay ningun parametro, es pq se creara un productos*/ 
        const formData = new FormData()
        formData.append('image',value.image[0])
        formData.append('name',value.name)
        formData.append('price',value.price)
        formData.append('description',value.description)
        formData.append('specifications[0]',value.specifications[0])
        formData.append('specifications[1]',value.specifications[1])
        formData.append('specifications[2]',value.specifications[2])
        formData.append('stock',value.stock)
        formData.append('category',value.category)
        setLoading(true)
        await addProductsOnSale(formData)
        /*Una vez completada la peticion, se muestra la alerta y se oculta el spinner*/ 
        setShowAlert(true)
        setLoading(false)
        /*Funcion de reac-hook-form para restablecer los valores de los inputs*/ 
        reset()
        }
        
    })
    return (
        <>
        <NavbarAdmin/>
        {/* <Spinner animation="border" /> */}
        <div className="container-add-products"></div>
        {/*encType="multipart/form-data" permite la carga de archivos, es fundamental para que
        el navegador entienda que el formulario puede contener datos binarios (como archivos)*/ }
        <form className="form-add-products" onSubmit={addNewProduct} encType="multipart/form-data">
            <input type="file" {...register('image')} onChange={(e)=>{
                /*e.target.files es un objeto FileList, que es una lista de objetos File, cada objeto
                en la lista representa un archivo seleccionado por el usuario*/
                const files = e.target.files
                if(files.length>0){
                    /*Se accede al primer archivo de la lista de archivos seleccionados*/ 
                const selectedFile = files[0]
                /*actualiza el estado image con el archivo que el usuario este seleccionando*/ 
                setImage(selectedFile)
                }else{
                    setImage(null)
                }
            }} />
            <label>Producto</label>
        {/*con el onChange de register estamos indicando que el valor del input sea siempre
        minusculas, aunque se escriba con mayusculas*/ }
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('name',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text" placeholder="ingresa el nombre del producto" />
            <label>Precio</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('price')} type="number" placeholder="ingresa el precio de tu producto"/>
            <label>Descripcion</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('description',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text" placeholder="ingresa una breve descripcion" />
            {/*Los valores de los 3 inputs se envian al sevidor como un array
            el servidor recibe el array con 3 valores y los envia a la bd
            en la bd se guarda el array en la propiedad specifications
            se le pone 0,1 y 2, para referirse al valor de cada input
            si solo pusieramos specifications, solo se guardaria un valor
            ya que no estamos indicando que valor corresponde a cada posicion del array*/ }
            <label>Caracteristica 1</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('specifications[0]',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text" placeholder="Primera caracteristica del producto"/>
            <label>Caracteristica 2</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('specifications[1]',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text" placeholder="Segunda caracteristica del producto"/>
            <label>Caracteristica 3</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('specifications[2]',{onChange:(e)=>e.target.value=e.target.value.toLowerCase()})} type="text" placeholder="Tercera caracteristica del producto"/>
            <label>Disponibles</label>
            <input style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('stock')} type="number" placeholder="productos disponibles"/>
            <label>Categoria</label>
            <select style={{width:"600px",border:"1px solid orange",borderRadius:"5px"}} {...register('category')} >
                <option value="Linea blanca" >Linea blanca</option>
                <option value="Electronica">Electronica</option>
                <option value="Muebles">Muebles</option>
            </select>
            <div style={{marginTop:"10px"}}>
              {showAlert&&(
                <Alert variant="success">Producto agregado correctamente</Alert>
              )}
            </div>
            <Button variant="warning" type="submit" style={{color:"#fff",marginTop:"10px"}}>{
                loading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden='true' /> <span>Cargando...</span></> : 'Añadir producto'
            }</Button>
        </form>
        </>
    )
}
export default FormAddProducts