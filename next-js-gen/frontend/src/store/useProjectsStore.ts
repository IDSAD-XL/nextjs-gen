import { create } from 'zustand';
import { Project } from '@/types/projects/project';

interface ProjectsState {
  projectsList: Project[];
  activeProject: Project['_id'] | null;
  setActiveProject: (projectId: Project['_id']) => void;
  setProjectsList: (projectsList: Project[]) => void;
  projectIsSaving: boolean;
  setProjectIsSaving: (isSaving: boolean) => void;
}

const useProjectsStore = create<ProjectsState>((set, get) => ({
  projectsList: [],
  activeProject: null,
  projectIsSaving: false,
  setActiveProject: (projectId: string) => {
    set({ activeProject: projectId });
  },
  setProjectsList: (projectsList: Project[]) => {
    set({ projectsList });
  },
  setProjectIsSaving: (isSaving: boolean) => {
    console.log('isSaving', isSaving);
    set({ projectIsSaving: isSaving });
  },
}));

export default useProjectsStore;
