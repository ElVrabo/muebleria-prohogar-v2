
import { createContext,useState } from "react";
import { createEmployeeRequest, deleteEmployeesRequest, editEmployeesRequest, filterEmployeeRequest, getEmployeesRequest } from "../api/employees";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)
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
    const filterEmployee = async(employeeName,inputEmployee)=>{
      try {
        const res = await filterEmployeeRequest(employeeName)
        setListEmployees(res.data)
      } catch (error) {
        await MySwal.fire({
          icon:"error",
          title:error.response.data.error
        })
        inputEmployee.current.value = null
      }
           
    }
    return (
        <employeesContext.Provider value={{
         listEmployees,
         getEmployees,
         createEmployees,
         deleteEmployees,
         editEmployees,
         filterEmployee
        }} >
           {children}
        </employeesContext.Provider>
    )
}