import axios from "./axios.js"

export const paymentRequest = (product)=>axios.post('/payment',product)