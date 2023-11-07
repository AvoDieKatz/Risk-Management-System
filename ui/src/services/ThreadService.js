import api from "../utils/api.js";

const basePath = "/thread";
export default {
    getThreads: (paramStatus = "ACTIVE") =>
        api.get(`${basePath}`, { params: { status: paramStatus } }),

    getSingleThread: (threadId) => api.get(`${basePath}/${threadId}`),

    getPersonalThreads: () => api.get(`${basePath}/personal`),
    
    createThread: (request) => api.post(`${basePath}`, request),

    updateThread: (threadId, request) =>
        api.put(`${basePath}/${threadId}`, request),

    deleteThread: (threadId) => api.delete(`${basePath}/${threadId}`),

    assessThread: (threadId, request) =>
        api.post(`${basePath}/${threadId}/assess`, request),

    assignThreadOwner: (threadId, paramOwnerId) =>
        api.put(`${basePath}/${threadId}/owner`, {
            params: { newOwnerId: paramOwnerId },
        }),

    reviewThread: (threadId, request) =>
        api.post(`${basePath}/${threadId}/review`, request),
};
