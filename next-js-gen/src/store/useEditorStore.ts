import create from 'zustand';

interface EditorState {
  count: number;
}

const useStore = create<EditorState>((set) => ({
  count: 0,
}));

export default useStore;
