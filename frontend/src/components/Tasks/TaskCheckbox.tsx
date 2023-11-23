import { BiCheck } from 'react-icons/bi';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { TaskCheckboxProps } from 'src/types/types';

export const TaskCheckbox = ({ task_title, id, isChecked }: TaskCheckboxProps) => {
    const { getSingleTask } = useTasksContext();

    if (id)
        return (
            <>
                <label htmlFor={String(id)} className="ml-2 text-sm font-medium text-gray-100 dark:text-gray-300 relative cursor-pointer mr">
                    <input
                        id={String(id)}
                        name={task_title}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => getSingleTask(id)}
                        className=" w-5 h-5 border-2 border-gray-200 accent-gray-100 bg-gray-100 border-gray-300 focus:ring-gray-100 dark:focus:ring-gray-200 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full "
                    />

                    <BiCheck
                        className={`w-5 h-5 text-bright-purple-300 text-md absolute top-0 right-0 ${
                            isChecked ? 'text-opacity-100' : 'text-opacity-0'
                        } check-1 transition rounded-full`}
                    />
                </label>
            </>
        );
};
