import axios from "./axios.js"

export const registerUserRequest=(user)=>axios.post('/register',user)
export const loginUserRequest = (user) => axios.post('/login',user)
export const verifyTokenRequest = ()=>axios.get('/verify')
export const editProfileRequest = (id,user)=>axios.put(`/editProfile/${id}`,user)
export const getUserRequest = (id) => axios.get(`/getUser/${id}` )
export const addAddressUserRequest = (data) =>axios.post('/addAddressUser',data)