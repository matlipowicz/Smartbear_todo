import { useParams } from 'react-router-dom';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Edit from '../../../public/icons/edit-2.svg?react';
import Flag from '../../../public/icons/flag.svg?react';
import Tag from '../../../public/icons/tag.svg?react';
import Timer from '../../../public/icons/timer.svg?react';
import TrashCan from '../../../public/icons/trash.svg?react';

import { TaskCheckbox } from './TaskCheckbox';

// const ICONS = [
//     {
//         icon: <Timer className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />,
//         property: 'Task time',
//     },
//     {
//         icon: <Tag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />,
//         property: 'Task category',
//     },
//     {
//         icon: <Flag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />,
//         property: 'Task priorioty',
//     },
//     {
//         icon: (
//             <button>
//                 <TrashCan className="w-6 h-6 fill-current text-red-100 hover:text-red-600 cursor-pointer" />
//             </button>
//         ),
//         property: 'Delete task',
//     },
// ];

export const TaskDetails = () => {
    const { id } = useParams();
    const { tasks } = useTasksContext();

    // TODO: Add category choice
    const task = tasks.find((task) => task.id === Number(id));

    return (
        <>
            {task && (
                <section className="h-full w-full flex flex-col gap-4 ">
                    <div>
                        <div className="flex gap-4 mb-4">
                            <TaskCheckbox task_title={task.task_title} id={task.id} isChecked={task.done} />

                            <div className="self-start">
                                <p className="text-lg">{task?.task_title}</p>
                                <p className="font-light text-gray-100	">{task?.description}</p>
                            </div>
                            <p className="grow flex justify-end">
                                <Edit className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="flex mb-5 ml-6 gap-4 justify-between">
                                <Timer className="w-6 h-6 min-w-fit	 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                <p className="grow">Task time</p>

                                <input
                                    defaultValue={task?.finalDate}
                                    type="text"
                                    className=" border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block  p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100"
                                />
                            </div>
                            <div className="flex mb-5 ml-6 gap-4 justify-between">
                                <Tag className="w-6 h-6 min-w-fit fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                <p className="grow">Task category</p>

                                <input
                                    defaultValue={'none'}
                                    type="text"
                                    className=" border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block  p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100"
                                />
                            </div>
                            <div className="flex mb-5 ml-6 gap-4 justify-between">
                                <Flag className="w-6 h-6 min-w-fit fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                <p className="grow">Task priority</p>

                                <input
                                    defaultValue={task?.priority}
                                    type="select"
                                    className=" border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block  p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100"
                                />
                            </div>
                            <div className="flex mb-5 ml-6 gap-4">
                                <button>
                                    <TrashCan className="w-6 h-6 min-w-fit fill-current text-red-100 hover:text-red-600 cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300 w-full"
                        >
                            Edit
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};
