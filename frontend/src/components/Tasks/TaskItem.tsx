import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskObjTypes } from 'src/types/types';

import Flag from '../../../public/icons/flag.svg?react';

import { TaskCheckbox } from './TaskCheckbox';

export const TaskItem = ({ task }: { task: TaskObjTypes }) => {
    const [selectDropdown, setSelectDropdown] = useState<boolean>(false);
    const ulRef = useRef<HTMLUListElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // TODO: Create component out of this block
    useEffect(() => {
        const outsideClick = (e: Event) => {
            const event = e.target as HTMLElement;

            if (!ulRef.current?.contains(event) && !btnRef.current?.contains(event)) {
                setSelectDropdown(false);
            }
        };
        document.addEventListener('click', outsideClick);
        return () => {
            document.removeEventListener('click', outsideClick);
        };
    }, [selectDropdown]);

    const multipliedDate = (task?.finalDate as number) * 1000;
    const formatedDate = new Date(multipliedDate).toLocaleDateString();

    return (
        <li key={task?.finalDate} className="mb-4 hover:cursor-pointer  ">
            <div className={`flex w-full items-center min-h-taskHeight bg-gray-200 ${task?.done ? 'brightness-50' : ''} rounded-md relative`}>
                <div className="flex items-center gap-4">
                    <TaskCheckbox task_title={task?.task_title} id={task?.id} isChecked={task?.done} />

                    <Link to={`${task?.id}`}>
                        <div className="hover:underline hover:underline-offset-4 hover:decoration-1	hover:decoration-gray-100/60	">
                            <p className={`text-white text-xl break-words break-all w-full mb-2 ${task?.done ? 'line-through' : ''}`}>
                                {task?.task_title}
                            </p>
                            <p className="text-gray-100 text-sm break-words">{formatedDate}</p>
                        </div>
                    </Link>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-4">
                    <div className="relative" />
                    <div className={`w-5 h-5 rounded-full ${task?.categoryClr}`} />
                    <div className="w-min">
                        <div className="flex items-center gap-2 border-2 border-bright-purple-100 p-1">
                            <Flag className="w-5 h-5 fill-current text-white" />
                            <p>{task?.priority}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
