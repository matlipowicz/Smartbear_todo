import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from 'src/components/Calendar/DatePicker';
import { Time } from 'src/components/Calendar/TimePicker';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import * as yup from 'yup';

import Flag from '../../../public/icons/flag.svg?react';
import Send from '../../../public/icons/send.svg?react';
import Tag from '../../../public/icons/tag.svg?react';
import Timer from '../../../public/icons/timer.svg?react';
import { CategoriesType } from '../Tasks/TaskDetails';

import { GenericModal } from './GenericModal';
import { TaskTitle } from './TaskTitle';

export type TaskObjTypes = {
    createdOn?: number;
    description?: string | undefined;
    done: boolean;
    finalDate: string;
    id: number;
    label_category: CategoriesType;
    priority: number;
    scheduledOn: string;
    task_title: string;
    time: string;
};

function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
}

export const TaskModal = () => {
    const [formPage, setFormPage] = useState<number>(1);
    const { submitHandler } = useTasksContext();

    const validationSchema = [
        yup.object({
            task_title: yup.string().required('Provide task title'),
            description: yup.string(),
        }),
        yup.object({
            scheduledOn: yup.string().required('Choose date to schedule your task'),
        }),
        yup.object({
            time: yup.string(),
            done: yup.boolean(),
            priority: yup.number(),
            createdOn: yup.string(),
            id: yup.number(),
        }),
    ];

    const currentSchema = validationSchema[formPage - 1];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        trigger,
        formState: { errors, isSubmitSuccessful },
    } = useForm<TaskObjTypes>({
        mode: 'onChange',
        shouldUnregister: false,
        defaultValues: {
            id: 0,
            task_title: '',
            description: '',
            createdOn: 0,
            scheduledOn: '',
            time: '',
            label_category: { categoryClr: '', value: '' },
            done: false,
            priority: 0,
            finalDate: '',
        },
        resolver: yupResolver(currentSchema as any),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setFormPage(1);
        }
    }, [isSubmitSuccessful, reset]);

    function renderView() {
        return formPage === 1 ? (
            <TaskTitle register={register} errors={errors} />
        ) : formPage === 2 ? (
            <DatePicker register={register} setValue={setValue} errors={errors} />
        ) : formPage === 3 ? (
            <Time register={register} setValue={setValue} errors={errors} />
        ) : null;
    }

    function renderButton() {
        return formPage === 3 ? (
            <div className="w-full flex flex-col">
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300 "
                    onClick={handleSubmit(submitHandler)}
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="focus:outline-none text-bright-purple-100 bg-transparent border-2 border-bright-purple-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-transparent   dark:focus:ring-bright-purple-300"
                >
                    Back
                </button>
            </div>
        ) : formPage === 2 ? (
            <>
                <>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300"
                    >
                        Choose Time
                    </button>
                </>
                <button
                    type="button"
                    onClick={handleBack}
                    className="focus:outline-none text-bright-purple-100 bg-transparent border-2 border-bright-purple-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-transparent   dark:focus:ring-bright-purple-300"
                >
                    Back
                </button>
            </>
        ) : formPage === 1 ? (
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Timer className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                    <Tag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                    <Flag className="w-6 h-6 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                </div>
                <button type="button" onClick={handleNext} className="send_btn">
                    <Send className="w-6 h-6 fill-current text-bright-purple-100 dark:hover:text-bright-purple-300 send_btn" />
                </button>
            </div>
        ) : null;
    }

    async function handleNext() {
        const isStepTaskTitleValid = await trigger();

        if (isStepTaskTitleValid) {
            setFormPage((prev: number) => prev + 1);
        }
    }

    function handleBack() {
        setFormPage((prev: number) => prev - 1);
    }

    return (
        <>
            <GenericModal background="bg-gray-200/50" blur="backdrop-blur-md">
                <form className="flex gap-4 flex-col">
                    {renderView()}
                    {renderButton()}
                </form>
            </GenericModal>
        </>
    );
};
