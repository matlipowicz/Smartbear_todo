import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMenuContext } from 'src/context/MenuContext/MenuContext';
import { useModalContext } from 'src/context/ModalContext/ModalContext';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

export type TaskObjTypes = {
    createdOn?: number;
    description?: string | undefined;
    done: boolean;
    finalDate: string;
    id: number;
    priority: number;
    scheduledOn: string;
    task_title: string;
    time: string;
};

function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
}

export const GenericModal = ({ children, background, blur }: { background: string; blur: string; children: ReactNode }) => {
    const { isOpen, close } = useModalContext();
    const { openMenu, setOpenMenu } = useMenuContext();
    const ref = useOutsideClick<HTMLDivElement>(close);
    const [windowSize, setWindowSize] = useState<number>(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <section
                className={`fixed inset-0 w-full h-full ${background} ${blur} z-9999 p-4 ${openMenu ? 'lg:ml-64 duration-500' : 'duration-700	'}`}
            >
                <div
                    className={`fixed  w-full min-w-[21.875rem] max-w-[34rem] p-4 bg-gray-200 top-1/2 left-1/2 ${
                        openMenu && windowSize >= 1024 ? '-translate-x-translateModalX' : '-translate-x-1/2'
                    }  -translate-y-1/2 z-1000`}
                    ref={ref}
                >
                    {children}
                </div>
                <button onClick={close} className={`text-white hover:bg-gray-200 p-2 rounded-md ${openMenu ? 'hidden' : 'block'}`}>
                    <svg aria-hidden="true" className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </section>
        </>,
        document.getElementById('portal') as HTMLElement
    );
};
