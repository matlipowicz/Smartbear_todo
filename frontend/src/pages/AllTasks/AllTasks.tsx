import { useEffect, useState } from 'react';
import { TaskList } from 'src/components/Tasks/TaskList';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { TaskObjTypes } from 'src/types/types';

import Component_4 from '../../../public/graphics/Component_4.svg?react';

import 'react-toastify/dist/ReactToastify.css';

const AllTasks = () => {
    const { tasks, setTasks } = useTasksContext();

    const [filterPriority, setFilterPriority] = useState<number | undefined>(undefined);
    const [filteredAllTasks, setFilteredAllTasks] = useState<TaskObjTypes[]>();
    const [sorting, setSorting] = useState<string>('ascending');

    useEffect(() => {
        const filteredAllTasks = tasks?.filter((task: TaskObjTypes) => Number(task.priority) === Number(filterPriority));
        setFilteredAllTasks(filteredAllTasks);
    }, [filterPriority, tasks]);

    function sortingDescendently() {
        const sorted = [...tasks].sort((a, b) => Number(a.priority) - Number(b.priority));
        setSorting('ascending');
        setTasks(sorted);
    }
    function sortingAscendently() {
        const sorted = [...tasks].sort((a, b) => Number(b.priority) - Number(a.priority));
        setSorting('descending');
        setTasks(sorted);
    }

    const displayTasks = filterPriority === undefined ? tasks : filteredAllTasks;
    if (displayTasks)
        return (
            <section className="mt-4">
                <div className=" h-full mt-6">
                    {displayTasks.length > 0 ? (
                        <>
                            <TaskList
                                tasks={displayTasks}
                                setFilterPriority={setFilterPriority}
                                sortingDescendently={sortingDescendently}
                                sortingAscendently={sortingAscendently}
                                sorting={sorting}
                            />
                        </>
                    ) : (
                        <div className="h-full w-full flex justify-start items-center flex-col gap-4 ">
                            <Component_4 />
                            <p className="text-2xl font-normal text-center lg:text-3xl	">What do you want to do today?</p>
                            <p className="font-light md:text-lg lg:text-xl">
                                Tap <span className="text-bright-purple-300">+</span> to add task
                            </p>
                        </div>
                    )}
                </div>
            </section>
        );
};

export default AllTasks;
