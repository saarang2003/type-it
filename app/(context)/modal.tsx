"use client";


import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TypingContext } from './typing';
import CustomizeModal from './CustomizeModal';
import QuoteTagsModal from './QouteModal';


export type ModalType =
  | { modal: 'customize' }
  | { modal: 'quoteTags' }
  | { modal: 'user' }
  | null;

interface Context {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
}

const initial: Context = {
  activeModal: null,
  onOpenModal: () => {},
};

export const ModalContext = createContext(initial);

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const { onTypingAllow, onTypingDisable } = useContext(TypingContext);
  const [activeModal, setActiveModal] = useState(initial.activeModal);

  /** Passing `null` to the function closes the modal */
  const onOpenModal: Context['onOpenModal'] = (modal) => {
    setActiveModal(modal);
  };

  useEffect(() => {
    if (activeModal) {
      onTypingDisable();
    } else {
      onTypingAllow();
    }
  }, [activeModal]);

  useEffect(() => {
      setActiveModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, onOpenModal }}>
      {children}
{activeModal &&
  createPortal(
    activeModal.modal === 'customize' ? (
      <CustomizeModal onClose={() => onOpenModal(null)} />
    ) : activeModal.modal === 'quoteTags' ? (
      <QuoteTagsModal onClose={() => onOpenModal(null)} />
    ) : null, // this handles other unexpected modal types
    document.body
  )
}

    </ModalContext.Provider>
  );
}