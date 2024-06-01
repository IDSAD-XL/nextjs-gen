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
import { AttributesTypes } from '@/types/attributes/attributes';

interface EditorState {
  editorData: Editor;
  treeViewOpen: boolean;
  setTreeViewOpen: (open: boolean) => void;
  setEditorData: (editorData: Editor) => void;
  activeEditorComponent: {
    component: ComponentsTypes;
    parentElementsPathIds: string[];
  } | null;
  setActiveEditorComponent: (
    component: ComponentsTypes,
    parentElementsPathIds: string[]
  ) => void;
  setActiveEditorComponentByPath: (parentElementsPathIds: string[]) => void;
  pushComponent: (
    componentData: { name: ComponentsTypes['name'] },
    parentElementsPathIds?: string[]
  ) => void;
  editComponent: (settings: SettingsTypes[]) => void;
  editComponentAttributes: (attributes: AttributesTypes[]) => void;
  deleteComponent: () => void;
}

const debouncedUpdateProject = debounce(async () => {
  const { activeProject } = useProjectsStore.getState();
  const { editorData } = useEditorStore.getState();

  if (!activeProject) return;

  const project: Project = {
    _id: activeProject._id,
    name: activeProject.name,
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
  treeViewOpen: false,
  setEditorData: (editorData) => {
    set({ editorData });
  },
  setTreeViewOpen: (open) => {
    set({ treeViewOpen: open });
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
  setActiveEditorComponentByPath: (parentElementsPathIds) => {
    set((state) => {
      const { components } = state.editorData;
      const foundElement = findComponentByIdPath(
        components,
        parentElementsPathIds
      );

      if (foundElement) {
        return {
          activeEditorComponent: {
            component: foundElement,
            parentElementsPathIds,
          },
        };
      }

      return { activeEditorComponent: null };
    });
  },
  pushComponent: (
    componentData: { name: ComponentsTypes['name'] },
    parentElementsPathIds
  ) => {
    set((state) => {
      const { components } = state.editorData;
      const newComponent = getNewComponent(componentData.name);

      if (parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          parentElementsPathIds
        );

        if (foundElement && foundElement.slots) {
          foundElement.slots.push(newComponent);
        }

        get().setActiveEditorComponent(newComponent, parentElementsPathIds);
      } else {
        components.push(newComponent);
        get().setActiveEditorComponent(newComponent, [newComponent.id]);
      }

      useProjectsStore.getState().setProjectIsSaved(false);

      debouncedUpdateProject();

      return { editorData: { components } };
    });
  },
  editComponent: (settings) => {
    set((state) => {
      const { components } = state.editorData;
      const activeComponent = state.activeEditorComponent;

      console.log(settings);

      settings.forEach((setting) => {
        const keys = Object.keys(setting.props) as any[];
        keys.forEach((key) => {
          const property = (setting as any).props[key];
          if (property && property.value === '') {
            delete (setting as any).props[key];
          }
        });
      });

      if (activeComponent?.parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          activeComponent.parentElementsPathIds
        );

        if (foundElement) {
          foundElement.styles = settings;
        }
      }

      useProjectsStore.getState().setProjectIsSaved(false);

      debouncedUpdateProject();

      return { editorData: { components } };
    });
  },
  editComponentAttributes: (attributes) => {
    set((state) => {
      const { components } = state.editorData;
      const activeComponent = state.activeEditorComponent;

      if (activeComponent?.parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          activeComponent.parentElementsPathIds
        );

        if (foundElement) {
          foundElement.attributes = attributes;
        }
      }

      useProjectsStore.getState().setProjectIsSaved(false);

      debouncedUpdateProject();

      return { editorData: { components } };
    });
  },
  deleteComponent: () => {
    set((state) => {
      const { components } = state.editorData;
      const activeComponent = state.activeEditorComponent;

      let componentsCopy = [...components];

      if (activeComponent?.parentElementsPathIds) {
        if (activeComponent?.parentElementsPathIds.length > 1) {
          const parent = findComponentByIdPath(
            componentsCopy,
            activeComponent.parentElementsPathIds.slice(
              0,
              activeComponent.parentElementsPathIds.length - 1
            )
          );

          if (parent) {
            if (parent && parent.slots) {
              parent.slots = parent.slots.filter(
                (slot) => slot.id !== activeComponent.component.id
              );
            }
          }
        } else if (activeComponent?.parentElementsPathIds.length === 1) {
          componentsCopy = componentsCopy.filter((component) => {
            return component.id !== activeComponent.component.id;
          });
        }
      }

      useProjectsStore.getState().setProjectIsSaved(false);

      debouncedUpdateProject();

      return {
        editorData: { components: componentsCopy },
        activeEditorComponent: null,
      };
    });
  },
}));

export default useEditorStore;
