import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { getTodos } from 'src/api/todos';
import { postTodo } from 'src/api/todos';
import { patchTodo } from 'src/api/todos';
import { deleteTodo } from 'src/api/todos';
import { TaskContextTypes } from 'src/types/context';
import { TaskObjTypes } from 'src/types/types';

export const TasksContext = createContext<TaskContextTypes | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TaskObjTypes[]>([]);
    const [singleTask, setSingleTask] = useState<TaskObjTypes | null>(null);
    const [checked, setChecked] = useState<boolean | undefined>(false);

    useEffect(() => {
        getTodos()
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    //* POST
    const submitHandler = async (data: TaskObjTypes) => {
        const formatedDate = moment(data.scheduledOn, 'ddd MMM DD YYYY HH:mm:ss');
        const formatedTime = moment(data.time, 'HH:mm:ss');
        formatedDate.set({
            h: formatedTime.hour(),
            m: formatedTime.minute(),
            s: formatedDate.second(),
        });
        const finalTaskDate = formatedDate.format('YYYY-MM-DDTHH:mm:ss');
        console.log(finalTaskDate);
        postTodo({
            task_title: data.task_title,
            description: data.description || undefined,
            createdOn: Date.now() || undefined,
            done: data.done,
            priority: 0,
            scheduledOn: '',
            time: data.time,
            finalDate: finalTaskDate,
            categoryClr: '',
            colorValue: '',
        }).then((data) => {
            if (data?.status === 200) {
                getTodos()
                    .then((data) => {
                        setTasks(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };
    //* PATCH done
    async function getSingleTask(id: number | undefined) {
        tasks.filter((task) => {
            if (task.id === id) {
                patchTodo({ ...task, done: !task.done }, id).then((data) => {
                    if (data?.status === 200) {
                        getTodos()
                            .then((data) => setTasks(data))
                            .catch((error) => console.log(error));
                    }
                });
            }
        });
    }

    //* PATCH EDIT

    async function editTask(id: number | undefined, data: TaskObjTypes) {
        tasks.filter((task) => {
            if (task.id === id) {
                console.log(data.finalDate);
                patchTodo(
                    {
                        ...task,
                        task_title: data?.task_title,
                        description: data?.description,
                        finalDate: data?.finalDate,
                        categoryClr: data?.categoryClr,
                        colorValue: data?.colorValue,
                        priority: data?.priority,
                    },
                    id
                ).then((data) => {
                    if (data?.status === 200) {
                        getTodos()
                            .then((data) => setTasks(data))
                            .catch((error) => console.log(error));
                    }
                });
            }
        });
    }

    //* DELETE

    async function deleteTask(id: number | undefined) {
        tasks.filter((task) => {
            if (task.id === id) {
                deleteTodo(id).then((data) => {
                    console.log(data);
                    if (data?.status === 200) {
                        getTodos()
                            .then((data) => setTasks(data))
                            .catch((error) => console.log(error));
                    }
                });
            }
        });
    }
    const findSingleTask = (id: number | undefined) => tasks.find((task) => (task.id === id ? setSingleTask(task) : null));

    return (
        <TasksContext.Provider
            value={{
                tasks,
                submitHandler,
                getSingleTask,
                checked,
                setChecked,
                deleteTask,
                findSingleTask,
                singleTask,
                editTask,
                setTasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksContext = () => {
    const ctx = useContext(TasksContext);

    if (!ctx) {
        throw new Error('Not in provider');
    }

    return ctx;
};
