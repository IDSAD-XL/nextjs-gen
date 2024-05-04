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
    parentElementsPathIds?: string[];
  } | null;
  setActiveEditorComponent: (
    component: ComponentsTypes,
    parentElementsPathIds?: string[]
  ) => void;
  pushComponent: (
    component: ComponentsTypes['name'],
    parentElementsPathIds?: string[]
  ) => void;
  editComponent: (
    componentId: string,
    parentElementsPathIds: string[],
    settings: SettingsTypes[]
  ) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  editorData: {
    components: [],
  },
  activeEditorComponent: null,
  setActiveEditorComponent: (component, parentElementsPathIds) => {
    console.log(component);
    set({ activeEditorComponent: { component, parentElementsPathIds } });
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
  editComponent: (componentId, parentElementsPathIds, settings) => {
    set((state) => {
      const { components } = state.editorData;

      console.log(componentId);
      console.log(components);

      const foundElement = findComponentByIdPath(
        components,
        parentElementsPathIds
      );

      console.log(foundElement);

      if (foundElement) {
        foundElement.styles = settings;
      }

      return { editorData: { components } };
    });
  },
}));

export default useEditorStore;
