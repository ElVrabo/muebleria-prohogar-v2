import axios from "./axios"
export const getProvidersProductsRequest = ()=>axios.get('/providerProducts')
export const addProviderProductsRequest = (provider)=>axios.post('/providerProducts',provider)
export const filterProviderProductRequest = (value)=>axios.get(`/filterProviderProducts?ProviderName=${value}`)
export const deleteProviderProductsRequest = (id)=>axios.delete(`/providerProducts/${id}`)