import "./employeesPages.css"
import { Button, Table } from "react-bootstrap"
import SideBar from "../../../common/sideBar/SideBar"
import { useContext, useEffect, useState } from "react"
import { employeesContext } from "../../../../context/employeesContext"
import iconDelete from "../../../../assets/icons/borrar.png"
import iconEdit from "../../../../assets/icons/editar.png"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom"
const MySwal = withReactContent(Swal)

const EmployeesPage = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const {getEmployees,listEmployees,deleteEmployees} = useContext(employeesContext)
    const navigate = useNavigate()
 useEffect(()=>{
    const loadEmployees = async()=>{
        await getEmployees()
        setIsLoading(false)
    }
    loadEmployees()
 },[])   


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
                        <input type="text" placeholder="Busca un empleado por su nombre" />
                        <Button variant="warning">Buscar</Button>
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
         }} />
         <img className="icon-edit" src={iconEdit} onClick={()=>{
            navigate(`/createEmployee/${employee._id}`)
         }}  />
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