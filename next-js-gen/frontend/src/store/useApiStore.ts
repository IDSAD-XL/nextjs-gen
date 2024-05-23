// src/store/useApiStore.ts
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore';
import useProjectsStore from '@/store/useProjectsStore';
import { Project } from '@/types/projects/project';
import useEditorStore from '@/store/useEditorStore';

interface ApiState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  createNewProject: (project: { name: string }) => Promise<any>;
  getProjectsByUser: () => Promise<any>;
  getProjectById: (id: string) => Promise<any>;
  getGeneratedProject: () => Promise<any>;
  updateProject: (project: Project) => Promise<any>;
  checkToken: () => Promise<void>;
}

const useApiStore = create<ApiState>((set, get) => ({
  login: async (credentials) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      credentials
    );
    const { token, user } = response.data;
    useAuthStore.getState().setAuth(token, user);
    localStorage.setItem('token', token);
  },
  register: async (credentials) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      credentials
    );
    const { token, user } = response.data;
    useAuthStore.getState().setAuth(token, user);
    localStorage.setItem('token', token);
  },
  createNewProject: async (project) => {
    const token = useAuthStore.getState().token;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await get().getProjectsByUser();

    return response.data;
  },
  getProjectsByUser: async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      useProjectsStore.setState({ projectsList: response.data });
    }

    return response.data;
  },
  getProjectById: async (id: string) => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
  updateProject: async (project) => {
    useProjectsStore.getState().setProjectIsSaving(true);

    const token = useAuthStore.getState().token;
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${project._id}`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      useEditorStore
        .getState()
        .setEditorData({ components: response.data.components });
    }

    useProjectsStore.getState().setProjectIsSaving(false);
    useProjectsStore.getState().setProjectIsSaved(true);
    return response.data;
  },
  getGeneratedProject: async () => {
    const id = useProjectsStore.getState().activeProject?._id;

    if (id) {
      useProjectsStore.getState().setProjectIsGenerating(true);

      const token = useAuthStore.getState().token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
    useProjectsStore.getState().setProjectIsGenerating(false);
  },
  checkToken: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/check-token`,
          { token }
        );
        if (response.data.valid) {
          const { user } = response.data;
          useAuthStore.getState().setAuth(token, user);
        } else {
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
            { token }
          );
          const newToken = refreshResponse.data.token;
          const newUser = refreshResponse.data.user;
          useAuthStore.getState().setAuth(newToken, newUser);
          localStorage.setItem('token', newToken);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
}));

export default useApiStore;
