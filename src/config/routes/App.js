import "../../index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { CATALOG, CATALOGID, CHANGEPASSWORDPAGES, CONTACT, CREATEEMPLOYEESPAGES, CREATEEMPLOYEESSPAGES, DASHBOARD, EDITEMPLOYEESPAGES, EDITPROFILE, EMPLOYEESPAGES, FAVORITEPRODUCTS, FORMADDADDRESS, FORMADDPRODUCTS, FORMADMIN, FORMLOGIN, FORMPROVIDERPRODUCTSPAGES, FORMREGISTER, HOME, LISTPROVIDERPRODUCTS, LOGIN, LOGINADMIN, MANAGEPRODUCTS, PROFILE, REGISTER, SHOPPINGCART } from "./path";
import { Home } from "../../components/pages/Home/Home";
import { UserContextProvider } from '../../context/usersContext';
import { ProductsContextProvider } from '../../context/productsContext';
import ProtectedRoutes from '../../ProtectedRoutes';
import Profile from '../../components/pages/profile/Profile';
import FavoriteProducts from '../../components/pages/profile/FavoriteProducts';
import ManageProducts from '../../components/pages/AdminPages/ManageProducts.js';
import FormAddProducts from '../../components/pages/AdminPages/FormAddProducts.js';
import ProductsDetailsPages from '../../components/pages/CatalogProducts/ProductsDetailsPages.js';
import CatalogProductsPages from '../../components/pages/CatalogProducts/CatalogProductsPages.js';
import CartPages from '../../components/pages/ProductsCart/CartPages.js';
import EditProfilePages from '../../components/pages/profile/EditProfilePages';
import ContactPages from '../../components/pages/Contact/ContactPages.js';
import FormAddAdress from "../../components/pages/FormAddAddress/FormAddAdress.js";
import LoginAdmin from "../../components/pages/AdminPages/LoginAdmin.js";
import Login from "../../components/pages/Auth/Login.js";
import Register from "../../components/pages/Auth/Register.js";
import { ProviderProductsContextProvider } from "../../context/providerProductsContext.js";
import FormProviderProductsPages from "../../components/pages/providerProductsPages/FormProviderProductsPages.js";
import ListProviderProducts from "../../components/pages/providerProductsPages/ListProviderProducts.js";
import ChangePassword from "../../components/pages/profile/ChangePassword.js";
import CreateEmployeesPages from "../../components/pages/AdminPages/createEmployees/CreateEmployees.js";
import { EmployeesContextProvider } from "../../context/employeesContext.js";
import EmployeesPage from "../../components/pages/AdminPages/createEmployees/EmployeesPages.js";



function App() {
  return (
   
     <UserContextProvider>
      <ProductsContextProvider>
        <ProviderProductsContextProvider>
      <EmployeesContextProvider>
      <Routes>
      <Route path={LOGIN} element={<Login/>}/>
      <Route path={REGISTER} element={<Register/>}/>
      <Route path={LOGINADMIN} element={<LoginAdmin/>} />
      <Route path={FORMADDPRODUCTS} element={<FormAddProducts/>} />
      <Route path={MANAGEPRODUCTS} element={<ManageProducts/>} />
      <Route path='/manageProducts/:id' element={<FormAddProducts/>} />
      <Route path={FORMPROVIDERPRODUCTSPAGES} element={<FormProviderProductsPages/>} />
      <Route path={LISTPROVIDERPRODUCTS} element={<ListProviderProducts/>} />
      <Route path={EMPLOYEESPAGES} element={<EmployeesPage/>} />
      <Route path={CREATEEMPLOYEESPAGES} element={<CreateEmployeesPages/>} />
      <Route path={EDITEMPLOYEESPAGES} element={<CreateEmployeesPages/>} />
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
      <Route path={CHANGEPASSWORDPAGES} element={<ChangePassword/>} />
      </Route>
    </Routes>
      </EmployeesContextProvider>
    </ProviderProductsContextProvider>
      </ProductsContextProvider>
     </UserContextProvider>
   
  );
}

export default App;
