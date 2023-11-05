import { UseFormRegister } from 'react-hook-form';

import { TaskObjTypes } from './TaskModal';

export const TaskTitle = ({ register }: { register: UseFormRegister<TaskObjTypes> }) => {
    return (
        <>
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
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200  dark:border-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Task description"
            />
        </>
    );
};
