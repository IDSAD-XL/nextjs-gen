import { create } from 'zustand';

interface ModalState {
  activeModal: 'auth' | 'register' | null;
  openAuthModal: () => void;
  openRegisterModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openAuthModal: () => set({ activeModal: 'auth' }),
  openRegisterModal: () => set({ activeModal: 'register' }),
  closeModal: () => set({ activeModal: null }),
}));

export default useModalStore;
