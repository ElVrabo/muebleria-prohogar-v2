import "./navigation.css"
import { Link } from "react-router-dom";
import { CATALOG, CONTACT, HOME, PROFILE, SHOPPINGCART } from "../../../config/routes/path";
import logoProhogar from "../../../assets/images/logoProhogar-removebg-preview.png"
import { useContext, useEffect, useState} from "react";
import { userContext } from "../../../context/usersContext";
import iconCart from "../../../assets/icons/shopping-cart.png"
import iconProfile from "../../../assets/images/Recurso 12.png"
import { productsContext } from "../../../context/productsContext";
import Button from 'react-bootstrap/Button';
import ModalComponent from "../modal/ModalComponent";
import Navbar from 'react-bootstrap/Navbar';
import { paymentRequest } from "../../../api/payment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal)





export const Navigation = () => {

  const [showModal, setShowModal] = useState(false)
  const {userData} = useContext(userContext)
  const {getProducts, listProductsCart, deleteProduct} = useContext(productsContext)

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
   
  useEffect(()=>{
    const loadProducts = async ()=>{
      await getProducts()
    }
    loadProducts()
  },[])
  



  return (
    <>
      <Navbar
      bg="light" data-bs-theme="light"
        className="navigation"
      >
        <div className="logo-furniture">
             <img src={logoProhogar}/>
        </div>
        <div className="link-navigation" >
         <h5>Hola {userData.username}</h5>
          <Link to={HOME} className="links"  >Inicio</Link>
          <Link to={CATALOG} className="links" >Productos</Link>
          <Link to={CONTACT} className="links" >Contacto</Link>
          <div className="icon-cart">
           <img className="avatar-cart" src={iconCart} onClick={()=>{
          setShowModal(true)
         }} />
          <div className="container-modal">
          <ModalComponent
          functionShow={showModal}
          funtionOnHide={handleClose}
          titleModal={"Carrito de compras"}
          bodyModal={
            <>
              {listProductsCart.length > 0 ? (
        <>
          {listProductsCart.map((p) => (
            <div key={p._id}>
              <section className="products-cart">
                <img src={p.image} alt="imagen del producto" />
                <div className="product-body">
                  <h2>{p.name[0].toUpperCase() + p.name.slice(1).toLowerCase()}</h2>
                  <p>{p.description}</p>
                  <p>${p.price}</p>
                  <div className="container-buttons-product" >
                  <Button
                    className="button-delete"
                    variant="warning"
                    onClick={async () => {
                      await deleteProduct(p._id);
                      MySwal.fire({
                        title: 'Se descartó correctamente',
                        icon: 'success',
                      });
                      getProducts();
                    }}
                  >
                    Descartar
                  </Button>
                  <Button
                    className="button-pay-a-product"
                    variant="light"
                    onClick={() => {
                      paymentRequest(p).then((res) => (window.location.href = res.data.init_point));
                    }}
                  >
                    Pagar este producto
                  </Button>
                  </div>
                </div>
              </section>
              <hr />
            </div>
          ))}
          <div className="container-button-pay-all-products" >
          <Button
            className="button-pay-all-products"
            variant="light"
            onClick={() => {
              paymentRequest(listProductsCart).then((res)=>window.location.href=res.data.init_point)
            }}
          >
            Ir a pagar todos los productos
          </Button>
          </div>
        </>
      ) : (
        <h5>No tienes ningún producto en el carrito</h5>
      )}
            </>
          }
          />
          </div>
          
           </div>
          <div className="profile-container" >
          {userData.image ? (
            <img className="avatar-profile" style={{width:"40px", height:"40px", borderRadius:"50%"}} src={userData.image} alt="icono profile"  />
          ): <img className="avatar-profile" style={{width:"40px", height:"40px", borderRadius:"50%"}} src={iconProfile} alt="icono profile"  />}
          <Link to={PROFILE} className="link-profile" >Mi cuenta</Link>
          </div>
        </div>
        
      </Navbar>
    
    </>
  );
};
