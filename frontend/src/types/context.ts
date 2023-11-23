import { TaskObjTypes } from './types';

export type MenuTypes = {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
export type TaskContextTypes = {
    checked: boolean | undefined;
    deleteTask(id: number | undefined): Promise<void>;
    editTask: (id: number | undefined, data: TaskObjTypes) => Promise<void>;
    findSingleTask: (id: number | undefined) => TaskObjTypes | undefined;
    getSingleTask: (id: number | undefined) => Promise<void>;
    setChecked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    setTasks: React.Dispatch<React.SetStateAction<TaskObjTypes[]>>;
    singleTask: TaskObjTypes | null;
    submitHandler: (data: TaskObjTypes) => void;
    tasks: TaskObjTypes[];
};

export type ModalContextTypes = {
    close: () => void;
    isOpen: boolean;
    open: () => void;
};
