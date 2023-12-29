
import { createContext,useState } from "react";
import { createEmployeeRequest, getEmployeesRequest } from "../api/employees";


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
    return (
        <employeesContext.Provider value={{
         listEmployees,
         getEmployees,
         createEmployees
        }} >
           {children}
        </employeesContext.Provider>
    )
}