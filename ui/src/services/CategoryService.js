import api from "../utils/api"

const basePath = "/category"
export default {
    getCategories: () => api.get(`${basePath}`),
    getCategory: (categoryId) => api.get(`${basePath}/${categoryId}`),
    createCategory: (request) => api.post(`${basePath}`, request),
    updateCategory: (categoryId, request) => api.put(`${basePath}/${categoryId}`, request),
    deleteCateogry: (categoryId) => api.delete(`${basePath}/${categoryId}`)
}