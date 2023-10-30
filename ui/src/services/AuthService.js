import api from "../utils/api.js";

const basePath = "/auth";
export default {
    authenticate: (request) => api.post(`${basePath}/authenticate`, request),
    logout: async () => api.post(`${basePath}/logout`),
    test: async () => {
        console.log("Test in Auth run");

        // In production /logout endpoint will instruct browser to clear all localstorage
        localStorage.removeItem("token");
        return "wut?";
    },
};