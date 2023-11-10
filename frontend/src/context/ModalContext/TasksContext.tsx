import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { getTodos } from 'src/api/todos';
import { postTodo } from 'src/api/todos';
import { patchTodo } from 'src/api/todos';
import { TaskObjTypes } from 'src/components/TaskModal/TaskModal';
type TaskContextTypes = {
    checked: boolean | undefined;
    getSingleTask: (id: number) => TaskObjTypes | undefined;
    handleChecked: () => void;
    setChecked: React.Dispatch<React.SetStateAction<boolean | undefined>>;

    submitHandler: (data: TaskObjTypes) => void;
    task: TaskObjTypes | null;
    tasks: TaskObjTypes[];
};

export const TasksContext = createContext<TaskContextTypes | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TaskObjTypes[]>([]);
    const [checked, setChecked] = useState<boolean | undefined>(false);

    useEffect(() => {
        getTodos()
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    //* POST
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
    //* PATCH
    async function getSingleTask(id: number) {
        tasks.filter((task) => {
            if (task.id === id) {
                patchTodo({ ...task, done: !task.done }, id).then((data) => {
                    if (data?.statusText === 'OK') {
                        getTodos()
                            .then((data) => setTasks(data))
                            .catch((error) => console.log(error));
                    }
                });
            } else {
                console.log('Nothing founded');
            }
        });

        // return updateTaskStatus;
    }

    return <TasksContext.Provider value={{ tasks, submitHandler, getSingleTask, checked, setChecked }}>{children}</TasksContext.Provider>;
};

export const useTasksContext = () => {
    const ctx = useContext(TasksContext);

    if (!ctx) {
        throw new Error('Not in provider');
    }

    return ctx;
};
