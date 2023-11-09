import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { getTodos } from 'src/api/todos';
import { postTodo } from 'src/api/todos';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';

type TaskContextTypes = {
    setTask: React.Dispatch<React.SetStateAction<TaskObjTypes[]>>;
    submitHandler: (data: TaskObjTypes) => void;
    tasks: TaskObjTypes[];
};

export const TasksContext = createContext<TaskContextTypes | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTask] = useState<TaskObjTypes[]>([]);

    useEffect(() => {
        getTodos().then((data) => setTask(data));
    }, []);

    const submitHandler = (data: TaskObjTypes) => {
        const formatedDate = moment(data.scheduledOn, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formatedTime = moment(data.time, 'HH:mm:ss A');
        formatedDate.set({
            h: formatedTime.hour(),
            m: formatedTime.minute(),
            s: formatedDate.second(),
        });
        const finalTaskDate = formatedDate.format();

        postTodo({
            id: tasks.length + 1,
            task_title: data.task_title,
            description: data.description || undefined,
            createdOn: Date.now() || undefined,
            done: data.done,
            priority: 0,
            scheduledOn: data.scheduledOn,
            time: data.time,
            finalDate: finalTaskDate,
        });
    };

    return <TasksContext.Provider value={{ tasks, setTask, submitHandler }}>{children}</TasksContext.Provider>;
};

export const useTasksContext = () => {
    const ctx = useContext(TasksContext);

    if (!ctx) {
        throw new Error('Not in provider');
    }

    return ctx;
};
