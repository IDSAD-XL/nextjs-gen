import { create } from 'zustand';

interface ModalState {
  activeModal: 'auth' | 'register' | 'createNewProject' | null;
  openAuthModal: () => void;
  openRegisterModal: () => void;
  openCreateNewProjectModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openAuthModal: () => set({ activeModal: 'auth' }),
  openRegisterModal: () => set({ activeModal: 'register' }),
  openCreateNewProjectModal: () => set({ activeModal: 'createNewProject' }),
  closeModal: () => set({ activeModal: null }),
}));

export default useModalStore;
