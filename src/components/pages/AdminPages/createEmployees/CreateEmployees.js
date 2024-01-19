import "./createEmployees.css"
import React, { useState,FormEvent, useContext } from "react"
import { Button } from "react-bootstrap"
import { employeesContext } from "../../../../context/employeesContext"
import SideBar from "../../../common/sideBar/SideBar"
import { useParams } from "react-router-dom"


const CreateEmployeesPages = ()=>{
    const [employeeData,setEmployeeData] = useState({
        username:null,
        age:null,
        phone:null,
        rol:null
    })
    const {createEmployees,editEmployees} = useContext(employeesContext)
    const {id} = useParams()
    const submitEmployee= async(e)=>{
        e.preventDefault()
        if(id){
            const employee = {
              username:employeeData.username,
              age:employeeData.age,
              phone:employeeData.phone,
              rol:employeeData.rol
            }
        await editEmployees(id,employee)
            return 
        }
        const employee={
         username:employeeData.username,
         age:employeeData.age,
         phone:employeeData.phone,
         rol:employeeData.rol
        }
        await createEmployees(employee)
    }
    return (
        <>
        <div className="container-grid" >
            <div className="container-sidebar">
                <SideBar/>
            </div>
           <div className="container-form-employees" >
           <form onSubmit={submitEmployee} className="form-employees" >
            <div className="container-labels">
            <div className="container-inputs" >
            <label>Nombre del empleado</label>
            <input type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,username:e.target.value})
            }} 
             />
            </div  >
             <div className="container-inputs">
             <label>edad</label>
            <input type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,age:e.target.value})
            }}/>
             </div>
            <div className="container-inputs">
            <label>Telefono</label>
            <input type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,phone:e.target.value})
            }} />
            </div>
            <div className="container-inputs">
            <label >Cargo que ocupa</label>
            <input type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,rol:e.target.value})
            }} />
            </div>
            </div>
            <Button className="btn-send-employee" type="submit" variant="warning">Crear empleado</Button>
           </form>
           </div>
        </div>
        </>
    )
}

export default CreateEmployeesPages