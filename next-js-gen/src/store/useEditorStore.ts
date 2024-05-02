import { create } from 'zustand';
import { Editor } from '@/types/editor';
import uuid4 from 'uuid4';
import { ComponentsTypes } from '@/types/pageComponents/componentsTypes';

interface EditorState {
  editorData: Editor;
  pushComponent: (
    component: ComponentsTypes,
    parentElementsPathIds?: string[]
  ) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  editorData: {
    components: [],
  },
  pushComponent: (component, parentElementsPathIds) => {
    set((state) => {
      const { components } = state.editorData;
      const newComponent = { ...component, id: uuid4() };
      if (parentElementsPathIds) {
        let parent = components;
        parentElementsPathIds.forEach((pathId) => {
          parent = parent.find((el) => el.id === pathId)?.slots || [];
        });
        parent.push(newComponent);
      } else {
        components.push(newComponent);
      }
      return { editorData: { components } };
    });
  },
}));

export default useEditorStore;
