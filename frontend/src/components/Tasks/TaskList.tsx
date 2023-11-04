import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import { TaskItem } from './TaskItem';

// TODO: Priority tasks as select, and category colors

//TODO: invisible input with changes

export const TaskTab = ({ todos }: any) => {
    const { tasks } = useTasksContext();

    if (!tasks) return null;

    return (
        <>
            <ul>
                {tasks.map((todo: any) => (
                    <TaskItem key={todo.id} task={todo} />
                ))}
            </ul>
        </>
    );
};
