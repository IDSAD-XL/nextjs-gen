'use client';
import React, { useRef } from 'react';
import useModalStore from '@/store/useModalStore';
import AuthModal from '@/components/modals/AuthModal';
import RegisterModal from '@/components/modals/RegisterModal';
import { useOnClickOutside } from 'usehooks-ts';
import CreateNewProject from '@/components/modals/CreateNewProject';

const ModalRenderer: React.FC = () => {
  const { activeModal, closeModal } = useModalStore();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, closeModal);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-50">
      <div ref={modalRef}>
        {activeModal === 'auth' && <AuthModal />}
        {activeModal === 'register' && <RegisterModal />}
        {activeModal === 'createNewProject' && <CreateNewProject />}
      </div>
    </div>
  );
};

export default ModalRenderer;
