import axios from "axios";
import { getTokenFromStorage } from "./storage";

const url =
    process.env.NODE_ENV === "production"
        ? "{productionURL}"
        : "http://localhost:8080/api";

const instance = axios.create({
    baseURL: url,
    headers: {
        Accept: "application/json",
    },
});

instance.interceptors.request.use((config) => {
    const token = getTokenFromStorage("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response.status >= 500) {
//             window.location.href = "/servererror"
//         } else {

//         }
//     }
// )

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         switch (error.response.status) {
//             case 401: // Not logged in
//             case 419: // Session expired
//             case 503: // Down for maintenance
//                 // Bounce the user to the login screen with a redirect back
//                 alert("Your session has expired, you will be logged out.");
//                 // window.location.href = "/login";
//                 break;
//             case 500:
//                 alert("Oops, something went wrong!");
//                 break;
//             default:
//                 // Allow individual requests to handle other errors
//                 return Promise.reject(error);
//         }
//     }
// );

export default instance;
