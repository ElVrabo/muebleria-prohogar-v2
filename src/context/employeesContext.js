
import { createContext,useState } from "react";
import { createEmployeeRequest, deleteEmployeesRequest, editEmployeesRequest, getEmployeesRequest } from "../api/employees";


export const employeesContext = createContext()

export const EmployeesContextProvider = ({children})=>{
    const [listEmployees,setListEmployees] = useState([])
    const getEmployees = ()=>{
        getEmployeesRequest().then((response)=>{
          setListEmployees(response.data)
        }).catch((error)=>console.log(error.response.data.error))
    }
    const createEmployees = (data)=>{
        createEmployeeRequest(data).then((response)=>{
            console.log(response.data.message)
        }).catch((error)=>console.log(error.response.data.error))
    }
    const deleteEmployees = (id)=>{
        deleteEmployeesRequest(id).then((response)=>{
            if(response.status === 201){
                setListEmployees(listEmployees.filter((employee)=>{
                  return employee._id !== id
                }))
            }
        }).catch((error)=>console.log(error.response.data.error))
    }
    const editEmployees = (id,data)=>{
      editEmployeesRequest(id,data).then((response)=>{
        console.log(response.data.message)
      }).then((error)=>console.log(error))
    }
    return (
        <employeesContext.Provider value={{
         listEmployees,
         getEmployees,
         createEmployees,
         deleteEmployees,
         editEmployees
        }} >
           {children}
        </employeesContext.Provider>
    )
}