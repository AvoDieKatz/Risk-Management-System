import api from "../utils/api.js";

const basePath = "/thread";
export default {
    getThreads: () => api.get(`${basePath}`),

    getSingleThread: (threadId) => api.get(`${basePath}/${threadId}`),

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
