import { TaskObjTypes } from '../TaskModal/TaskModal';

import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks }: { tasks: TaskObjTypes[] }) => {
    if (!tasks) return null;

    //TODO: add sorting to buttons
    // const sortingDescendently = [...tasks].sort((a, b) => {
    //     return Number(a.priority) - Number(b.priority);
    // });

    //TODO: add filter by priority to some button
    // const filteringTasks = (priority) => tasks.filter((task) => Number(task.priority) === Number(priority));

    //TODO: Copy that and display in the home view insted of a full list, full list will be in the all tasks tab
    const filteringTaskByDate = () =>
        tasks.filter((task) => {
            const today = new Date();
            const taskDate = new Date(task.finalDate);

            if (today.toDateString() === taskDate.toDateString()) {
                return task;
            }
        });

    console.log(filteringTaskByDate());

    return (
        <>
            <ul className="max-w-4xl flex flex-col m-auto">
                <div>
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
};
