import "./formAddEmployees.css"
import React, { useState,FormEvent, useContext, useRef } from "react"
import { Button } from "react-bootstrap"
import { employeesContext } from "../../../../context/employeesContext"
import SideBar from "../../../common/sideBar/SideBar"
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
        MySwal.fire({
            title:"Se agrego correctamente el empleado",
            icon:"success"
        })
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
           <form onSubmit={submitEmployee} className="form-employees" >
            <div className="container-labels">
            <div className="container-inputs" >
            <label>Nombre del empleado</label>
            <input ref={inputUser} type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,username:e.target.value})
            }} 
             />
            </div  >
             <div className="container-inputs">
             <label>edad</label>
            <input ref={inputAge} type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,age:e.target.value})
            }}/>
             </div>
            <div className="container-inputs">
            <label>Telefono</label>
            <input ref={inputPhone} type="text" onChange={(e)=>{
                setEmployeeData({...employeeData,phone:e.target.value})
            }} />
            </div>
            <div className="container-inputs">
            <label >Cargo que ocupa</label>
            <input ref={inputRol} type="text" onChange={(e)=>{
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

export default FormAddEmployees