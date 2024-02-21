import "./employeesPages.css"
import { Button, Table } from "react-bootstrap"
import SideBar from "../../../common/sideBar/SideBar"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { employeesContext } from "../../../../context/employeesContext"
import iconDelete from "../../../../assets/icons/borrar.png"
import iconEdit from "../../../../assets/icons/editar.png"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom"
import { CREATEEMPLOYEESPAGES } from "../../../../config/routes/path"
const MySwal = withReactContent(Swal)

const EmployeesPage = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [employeeName,setEmployeeName] = useState("")
    const {getEmployees,listEmployees,deleteEmployees, filterEmployee} = useContext(employeesContext)
    const inputEmployee = useRef()
    const navigate = useNavigate()
 useEffect(()=>{
    const loadEmployees = async()=>{
        await getEmployees()
        setIsLoading(false)   
    }
    loadEmployees()
 },[])   

 useEffect(()=>{
    if(!isLoading && listEmployees.length === 0){
          showAlert()
      } 

      async function showAlert(){
        const result = await MySwal.fire({
            title:"No hay empleados",
            icon:"error",
            showCancelButton:true,
            confirmButtonText:"Agregar nuevo empleado",
            cancelButtonText:"Cerrar"
        })
        if(result.isConfirmed){
            navigate(CREATEEMPLOYEESPAGES)
        }
      }
     
 },[isLoading, listEmployees])


    return (
        <>
        <div className="container-grid">
            <div className="container-sidebar">
                <SideBar/>
            </div>
            <div className="container-employees" >
                <div className="container-search-employees">
                    <h3>Busca un empleado</h3>
                    <div className="search-employees" >
                        <input ref={inputEmployee} type="text" placeholder="Busca un empleado por su nombre" onChange={(e)=>{
                            setEmployeeName(e.target.value)
                        }} />
                        <Button variant="warning" onClick={async()=>{
                         await filterEmployee(employeeName)
                         inputEmployee.current.value = ""
                        }} >Buscar</Button>
                    </div>
                </div>
                <Table striped bordered hover size="sm" style={{marginTop:"30px"}} >
                <thead>
        <tr>
          
          <th>Empleado</th>
          <th>Edad</th>
          <th>Telefono</th>
          <th>Rol</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       {listEmployees.map((employee)=>(
        <tr key={employee._id}>
        <td>{`${employee.username}`.toLowerCase()}</td>
        <td>{employee.age}</td>
        <td>{employee.phone}</td>
        <td>{employee.rol}</td>
        <td>{new Date(employee.date).toLocaleDateString()}</td>
        <td style={{display:"flex",gap:"7px"}}>
         <img className="icon-delete" src={iconDelete} onClick={async()=>{
           await deleteEmployees(employee._id)
           MySwal.fire({
            title:"El empleado se elimino correctamente",
            icon:"success"
           })
         }} />
         
        </td>
        </tr>
       ))}
        
      </tbody>
                </Table>
            </div>
        </div>
        </>
    )
}

export default EmployeesPage