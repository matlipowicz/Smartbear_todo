import { useEffect, useRef } from 'react';

export const useOutsideClick = <T,>(callback: () => void) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const outsideClick = (e: Event) => {
            const event = e.target as HTMLElement;

            if (
                ref.current instanceof HTMLElement &&
                !ref.current?.contains(event) &&
                event.innerText !== '+' &&
                !event.classList.contains('send_btn') &&
                event.innerText !== 'Choose Time' &&
                event.innerText !== 'Back'
            ) {
                callback();
            }
        };
        document.addEventListener('click', outsideClick);
        return () => {
            document.removeEventListener('click', outsideClick);
        };
    }, [callback]);

    return ref;
};
