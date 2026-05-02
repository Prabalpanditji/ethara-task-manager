import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const authService = {
    signup: (name, email, password) =>
        api.post('/auth/signup', { name, email, password }),
    login: (email, password) =>
        api.post('/auth/login', { email, password }),
    getProfile: () =>
        api.get('/auth/profile'),
    updateProfile: (data) =>
        api.put('/auth/profile', data)
};

export const projectService = {
    createProject: (data) =>
        api.post('/projects', data),
    getProjects: () =>
        api.get('/projects'),
    getProjectById: (id) =>
        api.get(`/projects/${id}`),
    updateProject: (id, data) =>
        api.put(`/projects/${id}`, data),
    deleteProject: (id) =>
        api.delete(`/projects/${id}`),
    addMember: (projectId, userId) =>
        api.post(`/projects/${projectId}/members`, { userId }),
    removeMember: (projectId, userId) =>
        api.delete(`/projects/${projectId}/members/${userId}`)
};

export const taskService = {
    createTask: (data) =>
        api.post('/tasks', data),
    getTasks: (filters) =>
        api.get('/tasks', { params: filters }),
    getTaskById: (id) =>
        api.get(`/tasks/${id}`),
    updateTask: (id, data) =>
        api.put(`/tasks/${id}`, data),
    deleteTask: (id) =>
        api.delete(`/tasks/${id}`),
    addComment: (taskId, text) =>
        api.post(`/tasks/${taskId}/comments`, { text }),
    getTaskStats: (projectId) =>
        api.get('/tasks/stats/overview', { params: { projectId } })
};

export default api;
