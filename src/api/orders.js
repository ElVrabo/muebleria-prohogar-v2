import axios from "./axios.js"

export const createOrderProductRequest = (productID, userData)=> axios.post(`/orders?preference_id=${productID}`, userData)
