module.exports = {
    channels: {
        IPC: "ipc-bridge",
        GET_TODOS: "get-todos",
    },
    notification: {
        SUCCESS: "success",
        ERROR: "error",
        WARN: "warning",
        INFO: "info",
    },
    messages: {
        SUCCESS: "SUCCESS!",
        ERROR: "An error has occured!",
        LOADING: "LOADING...",
        NOT_FOUND: "The resourece you are looking for does not exist.",
        CONTACT_ADMIN: "Please contact your administrator if you don't have an account.",
        FAILED_CONN: "There is no internet connection, try to reconnect."
    },
    roles: {
        ROLE_ADMIN: "Administrator",
        ROLE_CRO: "CRO",
        ROLE_MANAGER: "Manager",
        ROLE_ANALYST: "Analyst"
    },
    status: {
        IDENTIFIED: "IDENTIFIED",
        ACTIVE: "ACTIVE",
        REJECTED: "REJECTED",
        RESOLVED: "RESOLVED"
    }
};
