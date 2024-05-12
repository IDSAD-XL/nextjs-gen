import { create } from 'zustand';
import { Editor } from '@/types/editor';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import getNewComponent from '@/utils/getNewComponent';
import { SettingsTypes } from '@/types/styles/settingsTypes';
import findComponentByIdPath from '@/utils/findComponentByIdPath';

interface EditorState {
  editorData: Editor;
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

const useEditorStore = create<EditorState>((set, getState) => ({
  editorData: {
    components: [],
  },
  activeEditorComponent: null,
  setActiveEditorComponent: (component, parentElementsPathIds) => {
    console.log(component, parentElementsPathIds);
    set((state) => {
      return {
        activeEditorComponent: {
          component,
          parentElementsPathIds,
        },
      };
    });
    console.log(getState());
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

      return { editorData: { components } };
    });
  },
  editComponent: (settings) => {
    set((state) => {
      const { components } = state.editorData;
      const activeComponent = state.activeEditorComponent;

      console.log(settings);

      if (activeComponent?.parentElementsPathIds) {
        const foundElement = findComponentByIdPath(
          components,
          activeComponent.parentElementsPathIds
        );

        if (foundElement) {
          foundElement.styles = settings;
        }
      }

      return { editorData: { components } };
    });
  },
}));

export default useEditorStore;
