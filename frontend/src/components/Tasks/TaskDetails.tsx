import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

export const TaskDetails = () => {
    const { id } = useParams();
    const { tasks } = useTasksContext();

    function selectedTask() {
        tasks.filter((task) => {
            return task.id === Number(id) ? console.log(task) : null;
        });
    }

    useEffect(() => {
        selectedTask();
    }, []);
    return <div>TaskDetails {id}</div>;
};
