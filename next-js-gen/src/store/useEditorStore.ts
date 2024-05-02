import { create } from 'zustand';
import { Editor } from '@/types/editor';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';
import getNewComponent from '@/utils/getNewComponent';

interface EditorState {
  editorData: Editor;
  pushComponent: (
    component: ComponentsTypes['name'],
    parentElementsPathIds?: string[]
  ) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  editorData: {
    components: [],
  },
  pushComponent: (
    componentTagName: ComponentsTypes['name'],
    parentElementsPathIds
  ) => {
    set((state) => {
      const { components } = state.editorData;
      const newComponent = getNewComponent(componentTagName);

      console.log('newComponent');
      console.log(newComponent);
      if (parentElementsPathIds) {
        let parent: ComponentsTypes;

        const foundParentElement = components.find(
          (el) => el.id === parentElementsPathIds[0]
        );

        console.log(components, foundParentElement, parentElementsPathIds);

        if (foundParentElement) {
          parent = foundParentElement;

          if (parent) {
            parentElementsPathIds.forEach((pathId) => {
              if (parent.slots) {
                const findChildElement = parent.slots.find(
                  (el) => el.id === pathId
                );
                if (findChildElement) {
                  parent = findChildElement;
                }
              }
            });

            if (parent.slots) {
              parent.slots.push(newComponent);
            }
          }
        }
      } else {
        components.push(newComponent);
      }

      console.log(components);
      return { editorData: { components } };
    });
  },
}));

export default useEditorStore;
