import "./employeesPages.css"
import { Table } from "react-bootstrap"
import SideBar from "../../../common/sideBar/SideBar"
import { useContext, useEffect, useState } from "react"
import { employeesContext } from "../../../../context/employeesContext"

const EmployeesPage = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const {getEmployees,listEmployees} = useContext(employeesContext)

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
                <Table striped bordered hover size="sm" >
                <thead>
        <tr>
          
          <th>Empleado</th>
          <th>Edad</th>
          <th>Telefono</th>
          <th>Rol</th>
          <th>Fecha</th>
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