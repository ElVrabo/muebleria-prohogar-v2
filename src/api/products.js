import axios from "./axios"

export const getProductsRequest = ()=>axios.get('/productsCart')
export const addProductsRequest = (data)=>axios.post('/productsCart',data)
export const deleteProductsRequest = (id) =>axios.delete(`/productsCart/${id}`)
export const getFavoriteProductsRequest = ()=>axios.get('/favoriteProducts')
export const addFavoriteProductsRequest = (data)=>axios.post('/favoriteProducts',data)
export const deleteFavoriteProductsRequest = (id)=>axios.delete(`/favoriteProducts/${id}`)
export const getProductsOnSaleRequest = ()=>axios.get('/productsOnSale')
export const getProductOnSaleRequest = (id) =>axios.get(`/productOnSale/${id}`)
export const addProductsOnSaleRequest = (data)=>axios.post('/productsOnSale', data)
export const deleteProductsOnSaleRequest = (id)=>axios.delete(`/productsOnSale/${id}`)
export const editProductsOnSaleRequest =(id,product) => axios.put(`/productsOnSale/${id}`,product)
export const filterProductsNameRequest = (product)=>axios.get(`/filterProductByName?ProductName=${product}`)
