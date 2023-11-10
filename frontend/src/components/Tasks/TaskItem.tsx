import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Flag from '../../../public/icons/flag.svg?react';

import { TaskCheckbox } from './TaskCheckbox';

const CATEGORIES: { color: string; name: string }[] = [
    {
        color: 'category-red',
        name: 'red',
    },
    {
        color: 'category-orange',
        name: 'orange',
    },
    {
        color: 'category-yellow-100',
        name: 'bright yellow',
    },
    {
        color: 'category-yellow-200',
        name: 'mist-yellow',
    },
    {
        color: 'category-green',
        name: 'green',
    },
    {
        color: 'category-turquiose',
        name: 'turquiose',
    },
    {
        color: 'category-blue-100',
        name: 'bright-blue',
    },
    {
        color: 'category-blue-200',
        name: 'darker-blue',
    },
    {
        color: 'category-purple-200',
        name: 'mist-purple',
    },
    {
        color: 'category-purple-100',
        name: 'bright-pruple',
    },
];

export const TaskItem = ({ task }: { task: TaskObjTypes }) => {
    const [selectDropdown, setSelectDropdown] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('transparent');
    const { checked } = useTasksContext();
    const selectRef = useRef<HTMLLIElement | null>(null);
    const ulRef = useRef<HTMLUListElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleSelect = (category_color: string) => {
        setSelectedCategory(category_color);
    };

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
                            <p className="text-gray-100 text-sm break-words">{task?.finalDate}</p>
                        </div>
                    </Link>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-4">
                    <div className="relative">
                        <button
                            className={`bg-${selectedCategory}  w-7 h-7 border-2 rounded-full cursor-pointer hover:brightness-75	 `}
                            onClick={() => setSelectDropdown(!selectDropdown)}
                            ref={btnRef}
                        />
                        {selectDropdown ? (
                            <ul className="w-max p-2 bg-gray-300 rounded-md max-h-60 overflow-y-auto absolute right-0 " ref={ulRef}>
                                {CATEGORIES.map((category: { color: string; name: string }) => {
                                    return (
                                        <li className=" mb-3 p-2 last:mb-0 cursor-pointer hover:bg-gray-200/75 " key={category.name} ref={selectRef}>
                                            <button className="w-full flex gap-2 items-center" onClick={() => handleSelect(category.color)}>
                                                <div className={`w-4 h-4 rounded-full bg-${category.color}`} />
                                                <p>{category.name}</p>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>
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
