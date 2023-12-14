import axios from "./axios.js"

export const paymentRequest = (data)=>axios.post('/payment',data)