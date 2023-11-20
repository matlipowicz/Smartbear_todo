import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import { Dropdown } from 'flowbite-react';
import { TaskObjTypes } from 'src/types/types';

import Filter from '../../../public/icons/sort.svg?react';

import { TaskItem } from './TaskItem';

export const TaskList = ({
    tasks,
    setFilterPriority,
    sortingAscendently,
    sortingDescendently,
    sorting,
}: {
    setFilterPriority: any;
    sorting: string;
    sortingAscendently: any;
    sortingDescendently: any;
    tasks: TaskObjTypes[];
}) => {
    if (tasks !== null) {
        return (
            <>
                <ul className="max-w-4xl flex flex-col m-auto">
                    <div className="flex items-center">
                        <Dropdown
                            label={
                                <Filter className="w-6 h-6 md:w-8 md:h-8 fill-current text-white hover:text-bright-purple-100 self-center cursor-pointer " />
                            }
                            className="dark:bg-gray-300 p-4"
                        >
                            <div className="flex flex-col text-center gap-2">
                                <p className="text-center">Priority</p>
                                <Dropdown.Item onClick={() => setFilterPriority(undefined)}>
                                    <p className="text-category-yellow-100">Clear filter</p>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterPriority(0)} className="border border-red-100 text-center">
                                    <p className="text-red-100 w-full">0</p>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterPriority(1)} className="border border-category-orange">
                                    <p className="text-category-orange w-full">1</p>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterPriority(2)} className="border border-category-yellow-200">
                                    <p className="text-category-yellow-200 w-full">2</p>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterPriority(3)} className="border border-category-yellow-100">
                                    <p className="text-category-yellow-100 w-full">3</p>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterPriority(4)} className="border border-complete-task-green">
                                    <p className="text-complete-task-green w-full">4</p>
                                </Dropdown.Item>
                            </div>
                        </Dropdown>

                        {sorting === 'ascending' ? (
                            <button onClick={sortingAscendently} className="mr-4">
                                <FaSortAmountDownAlt className="w-5 h-5 md:w-7 md:h-7 hover:fill-bright-purple-100" />
                            </button>
                        ) : sorting === 'descending' ? (
                            <button onClick={sortingDescendently}>
                                <FaSortAmountDown className="w-5 h-5 md:w-7 md:h-7 hover:fill-bright-purple-100" />
                            </button>
                        ) : null}
                    </div>
                    <div className="mt-10">
                        <h1 className="text-2xl mb-4 text-complete-task-red">Tasks</h1>
                        {tasks.map((task: TaskObjTypes) => {
                            if (task.done === false) {
                                return <TaskItem key={task.id} task={task} />;
                            }
                        })}
                    </div>
                    <div className="mt-10">
                        <h1 className="text-2xl mb-4 text-complete-task-green">Completed</h1>
                        {tasks.map((task: TaskObjTypes) => {
                            if (task.done === true) {
                                return <TaskItem key={task.id} task={task} />;
                            }
                        })}
                    </div>
                </ul>
            </>
        );
    }
};
