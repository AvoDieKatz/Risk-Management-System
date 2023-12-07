import api from "../utils/api.js";

const basePath = "/thread";
export default {
    getThreads: (paramStatus = "ACTIVE") =>
        api.get(`${basePath}`, { params: { status: paramStatus } }),

    getSingleThread: (threadId) => api.get(`${basePath}/${threadId}`),

    getPersonalThreads: (type) => api.get(`${basePath}/personal`, { params: { type: type }}),

    getThreadAssessment: (threadId) => api.get(`${basePath}/${threadId}/assess`),
    
    createThread: (request) => api.post(`${basePath}`, request),

    updateThread: (threadId, request) =>
        api.put(`${basePath}/${threadId}`, request),

    deleteThread: (threadId) => api.delete(`${basePath}/${threadId}`),

    assessThread: (threadId, request) =>
        api.post(`${basePath}/${threadId}/assess`, request),

    assignThreadOwner: (threadId, paramOwnerId) => 
        api.put(`${basePath}/${threadId}/owner`, null, {
            params: { newOwnerId: paramOwnerId }
        }),

    getThreadReview: (threadId) => api.get(`${basePath}/${threadId}/review`),
        
    reviewThread: (threadId, request) => 
        api.post(`${basePath}/${threadId}/review`, request),

    getThreadSolutions: (threadId) => api.get(`${basePath}/${threadId}/solution`),

    createThreadSolution: (threadId, request) => api.post(`${basePath}/${threadId}/solution`, request)
};
