import { createContext, ReactNode, useContext, useState } from 'react';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';

type TaskContextTypes = {
    setTask: React.Dispatch<React.SetStateAction<TaskObjTypes[]>>;
    submitHandler: (data: TaskObjTypes) => void;
    tasks: TaskObjTypes[];
};

export const TasksContext = createContext<TaskContextTypes | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTask] = useState<TaskObjTypes[]>([]);
    const submitHandler = (data: TaskObjTypes) => {
        setTask((prev) => [
            ...prev,
            { id: tasks.length + 1, task_title: data.task_title, description: data.description, createdAt: Date.now(), done: data.done, priority: 0 },
        ]);
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
