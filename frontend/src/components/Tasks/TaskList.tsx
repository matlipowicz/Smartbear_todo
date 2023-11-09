import { TaskObjTypes } from '../TaskModal/TaskModal';

import { TaskItem } from './TaskItem';

// TODO: Priority tasks as select, and category colors

//TODO: invisible input with changes

export const TaskTab = ({ tasks }: { tasks: TaskObjTypes[] }) => {
    if (!tasks) return null;

    return (
        <>
            <ul className="max-w-4xl flex flex-col m-auto">
                {tasks.map((task: TaskObjTypes) => (
                    <TaskItem key={task.id} task={task} id={task.id} />
                ))}
            </ul>
        </>
    );
};
