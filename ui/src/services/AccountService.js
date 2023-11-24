import api from "../utils/api.js";

const basePath = "/admin"

// later use TanStack's Query -> need to return promise
// axios return a promise
export default {
    getAccounts: (param) => {
        if (param) {
            return api.get(`${basePath}/user`, {params: param})
        } else {
            return api.get(`${basePath}/user`)
        }
    },
    getAccountDetail: (accountId) => api.get(`${basePath}/user/${accountId}`),
    createAccount: (request) => api.post(`${basePath}/user`, request),
    updateAccount: (accountId, request) => api.put(`${basePath}/user/${accountId}`, request),
    removeAccount: (accountId) => api.delete(`${basePath}/user/${accountId}`)
}