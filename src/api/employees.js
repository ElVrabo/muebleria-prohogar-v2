import axios from "./axios.js"

export const getEmployeesRequest = ()=>axios.get('/employees')
export const createEmployeeRequest = (data)=>axios.post('/employees',data)
export const deleteEmployeesRequest = (id)=>axios.delete(`/employees/${id}`)
export const editEmployeesRequest = (id,data)=>axios.put(`/employees/${id}`,data)