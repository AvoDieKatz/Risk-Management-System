import api from "../utils/api.js";

export const data = ["Tung", "Tran", 1];

// later use TanStack's Query -> return promise
export const getTodos = () => api.get("/todos");

export const getUsers = () => api.get("/users")