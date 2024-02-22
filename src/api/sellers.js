import axios from "./axios"
export const getSellersRequest = ()=>axios.get('/providerProducts')
export const addSellersRequest = (seller)=>axios.post('/providerProducts',seller)
export const filterSellersRequest = (seller)=>axios.get(`/filterProviderProducts?ProviderName=${seller}`)
export const deleteSellersRequest = (id)=>axios.delete(`/providerProducts/${id}`)