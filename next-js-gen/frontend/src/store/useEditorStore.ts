import { create } from 'zustand';
import { Editor } from '@/types/editor';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import getNewComponent from '@/utils/getNewComponent';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import findComponentByIdPath from '@/utils/findComponentByIdPath';
import useApiStore from '@/store/useApiStore';
import { debounce } from 'lodash';
import { Project } from '@/types/projects/project';
import useProjectsStore from '@/store/useProjectsStore';

interface EditorState {
  editorData: Editor;
  setEditorData: (editorData: Editor) => void;
  activeEditorComponent: {
    component: ComponentsTypes;
    parentElementsPathIds: string[];
  } | null;
  setActiveEditorComponent: (
    component: ComponentsTypes,
    parentElementsPathIds: string[]
  ) => void;
  pushComponent: (
    component: ComponentsTypes['name'],
    parentElementsPathIds?: string[]
  ) => void;
  editComponent: (settings: SettingsTypes[]) => void;
}

const debouncedUpdateProject = debounce(async () => {
  console.log(123);
  const { activeProject } = useProjectsStore.getState();
  const { editorData } = useEditorStore.getState();

  if (!activeProject) return;

  const project: Project = {
    _id: activeProject,
    components: editorData.components,
  };

  const { updateProject } = useApiStore.getState();

  await updateProject(project);
}, 5000);

const useEditorStore = create<EditorState>((set, get) => ({
  editorData: {
    components: [],
  },
  activeEditorComponent: null,
  setEditorData: (editorData) => {
    set({ editorData });
  },
  setActiveEditorComponent: (component, parentElementsPathIds) => {
    set((state) => {
      return {
        activeEditorComponent: {
          component,
          parentElementsPathIds,
        },
      };
    });
  },
  pushComponent: (
    componentTagName: ComponentsTypes['name'],
    parentElementsPathIds
  ) => {
    set((state) => {
      const { components } = state.editorData;
      const newComponent = getNewComponent(componentTagName);

      if (parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          parentElementsPathIds
        );

        if (foundElement && foundElement.slots) {
          foundElement.slots.push(newComponent);
        }
      } else {
        components.push(newComponent);
      }

      debouncedUpdateProject();

      return { editorData: { components } };
    });
  },
  editComponent: (settings) => {
    set((state) => {
      const { components } = state.editorData;
      const activeComponent = state.activeEditorComponent;

      if (activeComponent?.parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          activeComponent.parentElementsPathIds
        );

        if (foundElement) {
          foundElement.styles = settings;
        }
      }

      debouncedUpdateProject();

      return { editorData: { components } };
    });
  },
}));

export default useEditorStore;
