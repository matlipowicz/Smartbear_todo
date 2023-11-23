import { createContext, useContext, useState } from 'react';
import React from 'react';
import { MenuTypes } from 'src/types/context';

export const MenuContext = createContext<MenuTypes | null>(null);
export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return <MenuContext.Provider value={{ openMenu, setOpenMenu }}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => {
    const ctx = useContext(MenuContext);

    if (!ctx) {
        throw new Error('Not in provider');
    }

    return ctx;
};
