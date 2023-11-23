import { Link } from 'react-router-dom';
import { TaskObjTypes } from 'src/types/types';

import Flag from '../../../public/icons/flag.svg?react';

import { TaskCheckbox } from './TaskCheckbox';

export const TaskItem = ({ task }: { task: TaskObjTypes }) => {
    const multipliedDate = task?.finalDate;
    const formatedDate = new Date(multipliedDate).toLocaleDateString();
    const priorityClr = () => {
        return task.priority == 0
            ? 'text-red-100'
            : task.priority == 1
            ? 'text-category-orange'
            : task.priority == 2
            ? 'text-category-yellow-200'
            : task.priority == 3
            ? 'text-category-yellow-100'
            : task.priority == 4
            ? 'text-category-green'
            : 'text-white';
    };

    const priorityClrBg = () => {
        return task.priority == 0
            ? 'bg-red-100/20'
            : task.priority == 1
            ? 'bg-category-orange/20'
            : task.priority == 2
            ? 'bg-category-yellow-200/20'
            : task.priority == 3
            ? 'bg-category-yellow-100/20'
            : task.priority == 4
            ? 'bg-category-green/20'
            : 'bg-transparent';
    };
    return (
        <li key={task?.finalDate} className="mb-4">
            <div className={`flex w-full items-center min-h-taskHeight bg-gray-200 ${task?.done ? 'brightness-50' : ''} rounded-md relative`}>
                <div className="flex items-center gap-4">
                    <TaskCheckbox task_title={task?.task_title} id={task?.id} isChecked={task?.done} />

                    <Link to={`${task?.id}`}>
                        <div className="hover:underline hover:underline-offset-4 hover:decoration-1	hover:decoration-gray-100/60 pr-2">
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
                        <div className={`flex items-center ${priorityClrBg()} gap-2 border-2 border-transparent p-1`}>
                            <Flag className={`w-5 h-5 fill-current ${priorityClr()}`} />
                            <p className={`${priorityClr()}`}>{task?.priority}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
