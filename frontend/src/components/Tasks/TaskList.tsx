import { useTasksContext } from 'src/context/ModalContext/TasksContext';

// TODO: Priority tasks as select, and category colors

//TODO: invisible input with changes

export const TaskTab = () => {
    const { tasks } = useTasksContext();

    if (!tasks) return null;
    console.log(tasks);

    return (
        <>
            <ul>
                {/* {tasks.map((task: TaskObjTypes) => (
                    <TaskItem key={task.id} task={task} />
                ))} */}
            </ul>
        </>
    );
};
