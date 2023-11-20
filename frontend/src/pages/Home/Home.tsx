import { useEffect, useState } from 'react';
import { TaskList } from 'src/components/Tasks/TaskList';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { TaskObjTypes } from 'src/types/types';

import Component_4 from '../../../public/graphics/Component_4.svg?react';

const Home = () => {
    const { tasks, setTasks } = useTasksContext();
    const [filterPriority, setFilterPriority] = useState<number | undefined>(undefined);
    const [filteredTodayTasks, setFilteredTodayTasks] = useState<TaskObjTypes[]>();
    const [sorting, setSorting] = useState<string>('ascending');
    useEffect(() => {
        const filteredTodayTasks = tasks?.filter((task) => {
            const multipliedDate = (task.finalDate as number) * 1000;
            const today = new Date();
            const taskDate = new Date(multipliedDate);

            return today.toDateString() === taskDate.toDateString();
        });

        setFilteredTodayTasks(filteredTodayTasks);

        if (filterPriority !== undefined) {
            const filteredTodayTasksByPriority = filteredTodayTasks.filter((task) => Number(task?.priority) === Number(filterPriority));
            setFilteredTodayTasks(filteredTodayTasksByPriority);
        }
    }, [tasks, filterPriority]);

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

    if (filteredTodayTasks)
        return (
            <>
                <div className=" h-full">
                    {filteredTodayTasks?.length > 0 ? (
                        <div>
                            <h1 className="text-4xl text-center font-thin mb-12">Today tasks</h1>
                            <TaskList
                                tasks={filteredTodayTasks}
                                setFilterPriority={setFilterPriority}
                                sortingDescendently={sortingDescendently}
                                sortingAscendently={sortingAscendently}
                                sorting={sorting}
                            />
                        </div>
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
            </>
        );
};

export default Home;
