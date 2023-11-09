import { useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';

import Flag from '../../../public/icons/flag.svg?react';

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

export const TaskItem = ({ task, id }: { id: number; task: TaskObjTypes }) => {
    const [selectDropdown, setSelectDropdown] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('transparent');
    const [isChecked, setIsChecked] = useState<boolean>(task.done);
    const selectRef = useRef<HTMLLIElement | null>(null);
    const ulRef = useRef<HTMLUListElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleSelect = (category_color: string) => {
        setSelectedCategory(category_color);
    };

    const handleChecked = () => {
        setIsChecked(!isChecked);
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
        <Link to={`${id}`}>
            <li key={task.id} className="mb-4 hover:cursor-pointer  ">
                <div className={`flex w-full items-center min-h-taskHeight bg-gray-200 ${isChecked ? 'brightness-50' : ''} rounded-md relative`}>
                    <div className="flex items-center gap-4">
                        <label
                            htmlFor={String(task.id)}
                            className="ml-2 text-sm font-medium text-gray-100 dark:text-gray-300 relative cursor-pointer mr"
                        >
                            <input
                                id={String(task.id)}
                                name={task.task_title}
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChecked}
                                className=" w-5 h-5 border-2 border-gray-200 accent-gray-100 bg-gray-100 border-gray-300 focus:ring-gray-100 dark:focus:ring-gray-200 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full "
                            />

                            <BiCheck
                                className={`w-5 h-5 text-bright-purple-300 text-md absolute top-0 right-0 ${
                                    isChecked ? 'text-opacity-100' : 'text-opacity-0'
                                } check-1 transition rounded-full`}
                            />
                        </label>

                        <div>
                            <p className={`text-white text-xl break-words break-all w-full mb-2 ${isChecked ? 'line-through' : ''}`}>
                                {task.task_title}
                            </p>
                            <p className="text-gray-100 text-sm break-words">{task.finalDate}</p>
                        </div>
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
                                            <li
                                                className=" mb-3 p-2 last:mb-0 cursor-pointer hover:bg-gray-200/75 "
                                                key={category.name}
                                                ref={selectRef}
                                            >
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
                                <p>1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
};
