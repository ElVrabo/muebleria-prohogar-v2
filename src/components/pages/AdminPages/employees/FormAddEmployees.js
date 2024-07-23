import "./formAddEmployees.css"
import React, { useState,FormEvent, useContext, useRef } from "react"
import { Button } from "react-bootstrap"
import { employeesContext } from "../../../../context/employeesContext"
import SideBar from "../../../common/sideBar/SideBar"
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)
const FormAddEmployees = ()=>{
    const [employeeData,setEmployeeData] = useState({
        username:null,
        age:null,
        phone:null,
        rol:null
    })
    const {createEmployees} = useContext(employeesContext)
    const inputUser = useRef()
    const inputAge = useRef()
    const inputPhone = useRef()
    const inputRol = useRef()
    async function submitEmployee(e){
        e.preventDefault()
        if(!employeeData.username || !employeeData.age || !employeeData.phone || !employeeData.rol){
        MySwal.fire({
            title:"Rellena todos los campos",
            icon:"error"
        })
        return 
        }
        const employee={
         username:employeeData.username,
         age:employeeData.age,
         phone:employeeData.phone,
         rol:employeeData.rol
        }
        await createEmployees(employee)
        setEmployeeData({...employeeData, username:null})
        setEmployeeData({...employeeData, age:null})
        setEmployeeData({...employeeData, phone:null})
        setEmployeeData({...employeeData, rol:null})
        inputUser.current.value = ""
        inputAge.current.value = ""
        inputPhone.current.value = ""
        inputRol.current.value = ""
    }
    return (
        <>
        <div className="container-grid" >
            <div className="container-sidebar">
                <SideBar/>
            </div>
           <div className="container-form-employees" >
           <Form onSubmit={submitEmployee} className="form-employees" >
            <div className="container-labels">
            <div className="container-inputs" >
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control ref={inputUser} type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,username:e.target.value})
            }} 
             />
            </div  >
             <div className="container-inputs">
             <Form.Label>edad</Form.Label>
            <Form.Control ref={inputAge} type="number" onChange={(e)=>{
                setEmployeeData({...employeeData,age:e.target.value})
            }}/>
             </div>
            <div className="container-inputs">
            <Form.Label>Telefono</Form.Label>
            <Form.Control ref={inputPhone} type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,phone:e.target.value})
            }} />
            </div>
            <div className="container-inputs">
            <Form.Label >Cargo que ocupa</Form.Label>
            <Form.Select ref={inputRol} className="select-rol" onChange={(e)=>{
                setEmployeeData({...employeeData,rol:e.target.value})
            }} >
            <option value="" disabled selected hidden>Selecciona un cargo</option>
                <option value="Gerente de piso" >Gerente de piso</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Cobrador">Cobrador</option>
            </Form.Select>
            </div>
            </div>
            <Button className="btn-send-employee" type="submit" variant="warning">Crear empleado</Button>
           </Form>
           </div>
        </div>
        </>
    )
}

export default FormAddEmployees