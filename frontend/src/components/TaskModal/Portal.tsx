import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    children: ReactNode;
    wrapperId: string;
};

export const Portal = ({ children, wrapperId }: PortalProps) => {
    return createPortal(children, document.getElementById(wrapperId) as HTMLElement);
};
