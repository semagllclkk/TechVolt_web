import axios from 'axios';
import type { Project, CreateProjectInput, UpdateProjectInput, ContactMessage } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/api/projects');
    return response.data;
  },

  getOne: async (id: number): Promise<Project> => {
    const response = await api.get<Project>(`/api/projects/${id}`);
    return response.data;
  },

  create: async (data: CreateProjectInput): Promise<Project> => {
    const response = await api.post<Project>('/api/projects', data);
    return response.data;
  },

  update: async (id: number, data: UpdateProjectInput): Promise<Project> => {
    const response = await api.patch<Project>(`/api/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/projects/${id}`);
  },
};

// Contact API
export const contactApi = {
  send: async (data: ContactMessage) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await api.patch(`/contact/${id}`, { isRead: true });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/contact/${id}`);
  },
};
