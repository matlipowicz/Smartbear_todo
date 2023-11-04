import { createContext, useContext, useState } from 'react';
import React from 'react';

type ModalContextTypes = {
    close: () => void;
    isOpen: boolean;
    open: () => void;
};
export const ModalContext = createContext<ModalContextTypes | null>(null);
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function open() {
        setIsOpen(true);
    }
    function close() {
        setIsOpen(false);
    }

    return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
    const ctx = useContext(ModalContext);

    if (!ctx) {
        throw new Error('Not in provider');
    }

    return ctx;
};
