import "./dashboards.css"
import SideBar from "../../common/sideBar/SideBar"
import HeaderAdmin from "./HeaderAdmin"
// import NavbarAdmin from "./NavbarAdmin"

const Dashboard = ()=>{
    return (
        <>
        <div className="container-grid">
             <div className="container-sidebar">
            <SideBar/>
             </div>
             <div className="actions">
            <HeaderAdmin/>
             </div>
        </div>
        
        </>
    )}
 export default Dashboard