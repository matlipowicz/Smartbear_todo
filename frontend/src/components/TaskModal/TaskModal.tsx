import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useModalContext } from 'src/context/ModalContext/ModalContext';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Flag from '../../../public/icons/flag.svg?react';
import Send from '../../../public/icons/send.svg?react';
import Tag from '../../../public/icons/tag.svg?react';
import Timer from '../../../public/icons/timer.svg?react';

export type TaskObjTypes = {
    createdAt: string | number;
    description: string;
    done: boolean;
    id: number;
    priority: number;
    task_title: string;
};

export const TaskModal = () => {
    const { isOpen, close } = useModalContext();
    const { submitHandler, tasks } = useTasksContext();
    const modalRef = useRef<HTMLDivElement | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<TaskObjTypes>({
        defaultValues: {
            id: 0,
            task_title: '',
            description: '',
            createdAt: '',
            done: false,
            priority: 0,
        },
    });

    // TODO: Wrzucić to jako komponent
    useEffect(() => {
        const outsideClick = (e: Event) => {
            const event = e.target as HTMLElement;

            if (!modalRef.current?.contains(event) && event.innerText !== '+') {
                close();
            }
        };
        document.addEventListener('click', outsideClick);
        return () => {
            document.removeEventListener('click', outsideClick);
        };
    }, [close]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                task_title: '',
                description: '',
            });
        }
    }, [isSubmitSuccessful, reset]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <section className="fixed inset-0 w-full h-full bg-gray-200/50 backdrop-blur-md z-1000 p-4">
                <div className=" fixed w-full p-4 bg-gray-200 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000" ref={modalRef}>
                    <form className="flex gap-4 flex-col" onSubmit={handleSubmit(submitHandler)}>
                        <label htmlFor="task-title" className="text-white">
                            Task name
                        </label>

                        <input
                            {...register('task_title')}
                            name="task_title"
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100"
                        />

                        <textarea
                            {...register('description')}
                            name="description"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray- rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:bg-gray-200 dark:border-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Task description"
                        />

                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <Timer className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                <Tag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                <Flag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                            </div>
                            <button type="submit">
                                <Send className="w-6 h-6 fill-current text-bright-purple-100" />
                            </button>
                        </div>
                    </form>
                </div>
                <button onClick={close} className="text-white">
                    X
                </button>
            </section>
        </>,
        document.getElementById('portal') as HTMLElement
    );
};
