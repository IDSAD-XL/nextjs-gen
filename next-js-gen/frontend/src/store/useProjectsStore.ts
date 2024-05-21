import { create } from 'zustand';
import { Project } from '@/types/projects/project';

interface ProjectsState {
  projectsList: Project[];
  activeProject: { _id: Project['_id']; name: Project['name'] } | null;
  setActiveProject: (project: {
    _id: Project['_id'];
    name: Project['name'];
  }) => void;
  setProjectsList: (projectsList: Project[]) => void;
  projectIsSaving: boolean;
  projectIsSaved: boolean;
  setProjectIsSaving: (isSaving: boolean) => void;
  setProjectIsSaved: (isSaved: boolean) => void;
}

const useProjectsStore = create<ProjectsState>((set, get) => ({
  projectsList: [],
  activeProject: null,
  projectIsSaving: false,
  projectIsSaved: true,
  setActiveProject: (project: {
    _id: Project['_id'];
    name: Project['name'];
  }) => {
    set({ activeProject: project });
  },
  setProjectIsSaved: (isSaved: boolean) => {
    set({ projectIsSaved: isSaved });
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
