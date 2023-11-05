import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { DatePicker } from 'src/components/Calendar/DatePicker';
import { useModalContext } from 'src/context/ModalContext/ModalContext';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Flag from '../../../public/icons/flag.svg?react';
import Send from '../../../public/icons/send.svg?react';
import Tag from '../../../public/icons/tag.svg?react';
import Timer from '../../../public/icons/timer.svg?react';

import { TaskTitle } from './TaskTitle';

export type TaskObjTypes = {
    createdAt: string | number;
    description: string;
    done: boolean;
    id: number;
    priority: number;
    scheduledOn: string;
    task_title: string;
};

export const TaskModal = () => {
    const { isOpen, close } = useModalContext();
    const [formPage, setFormPage] = useState<number>(1);
    const { submitHandler, tasks } = useTasksContext();
    const modalRef = useRef<HTMLDivElement>(null);

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
            scheduledOn: '',
            done: false,
            priority: 0,
        },
    });
    console.log(tasks);
    // TODO: Wrzucić to jako komponent
    useEffect(() => {
        const outsideClick = (e: Event) => {
            const event = e.target as HTMLElement;

            if (!modalRef.current?.contains(event) && event.innerText !== '+' && !event.classList.contains('send_btn')) {
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
                    <form className="flex gap-4 flex-col " onSubmit={handleSubmit(submitHandler)}>
                        {formPage === 1 ? <TaskTitle register={register} /> : formPage === 2 ? <DatePicker register={register} /> : null}
                        {formPage === 3 ? (
                            <button
                                type="submit"
                                className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300 self-end"
                            >
                                Save
                            </button>
                        ) : formPage === 2 ? (
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300"
                                onClick={() => setFormPage((prev: number) => prev + 1)}
                            >
                                Choose Time
                            </button>
                        ) : formPage === 1 ? (
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <Timer className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                    <Tag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                    <Flag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                </div>
                                <button type="button" onClick={() => setFormPage((prev: number) => prev + 1)} className="send_btn">
                                    <Send className="w-6 h-6 fill-current text-bright-purple-100 dark:hover:text-bright-purple-300 send_btn" />
                                </button>
                            </div>
                        ) : null}
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
