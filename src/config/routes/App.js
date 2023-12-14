import "../../index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { CATALOG, CATALOGID, CONTACT, DASHBOARD, EDITPROFILE, FAVORITEPRODUCTS, FORMADDADDRESS, FORMADDPRODUCTS, FORMADMIN, FORMLOGIN, FORMREGISTER, HOME, LOGIN, LOGINADMIN, MANAGEPRODUCTS, PROFILE, REGISTER, SHOPPINGCART } from "./path";
import { Home } from "../../components/pages/Home/Home";
import { UserContextProvider } from '../../context/usersContext';
import { ProductsContextProvider } from '../../context/productsContext';
import ProtectedRoutes from '../../ProtectedRoutes';
import Dashboard from '../../components/pages/AdminPages/Dashboard';
import Profile from '../../components/pages/profile/Profile';
import FavoriteProducts from '../../components/pages/profile/FavoriteProducts';
import ManageProducts from '../../components/pages/AdminPages/ManageProducts.js';
import FormAddProducts from '../../components/pages/AdminPages/FormAddProducts.js';
import ProductsDetailsPages from '../../components/pages/CatalogProducts/ProductsDetailsPages.tsx';
import CatalogProductsPages from '../../components/pages/CatalogProducts/CatalogProductsPages.js';
import CartPages from '../../components/pages/ProductsCart/CartPages.js';
import EditProfilePages from '../../components/pages/profile/EditProfilePages';
import ContactPages from '../../components/pages/Contact/ContactPages.tsx';
import FormAddAdress from "../../components/pages/FormAddAddress/FormAddAdress.js";
import LoginAdmin from "../../components/pages/AdminPages/LoginAdmin.js";
import Login from "../../components/pages/Auth/Login.js";
import Register from "../../components/pages/Auth/Register.js";




function App() {
  return (
   
     <UserContextProvider>
      <ProductsContextProvider>
      <Routes>
      <Route path={LOGIN} element={<Login/>}/>
      <Route path={REGISTER} element={<Register/>}/>
      <Route path={LOGINADMIN} element={<LoginAdmin/>} />
      <Route path={DASHBOARD} element={<Dashboard/>}/>
      <Route path={FORMADDPRODUCTS} element={<FormAddProducts/>} />
      <Route path={MANAGEPRODUCTS} element={<ManageProducts/>} />
      <Route path='/manageProducts/:id' element={<FormAddProducts/>} />
      {/*Dentro de ProtectedRoutes se ponen las rutas que necesitan que el usuario este
      autenticado para que puedan acceder a ellas*/ }
      <Route element={<ProtectedRoutes/>}>
      <Route path={HOME} element={<Home />} />
      <Route path={PROFILE} element={<Profile/>} />
      <Route path={EDITPROFILE} element={<EditProfilePages/>} />
      <Route path={FAVORITEPRODUCTS} element={<FavoriteProducts/>} />
      <Route path={CATALOG} element={<CatalogProductsPages/>} />
      <Route path={SHOPPINGCART} element={<CartPages/>} />
      <Route path={CATALOGID} element={<ProductsDetailsPages/>} />
      <Route path={CONTACT} element={<ContactPages/>} />
      <Route path={FORMADDADDRESS} element={<FormAddAdress/>} />
      </Route>
    </Routes>
      </ProductsContextProvider>
     </UserContextProvider>
   
  );
}

export default App;
