import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import moment from 'moment';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import Flag from '../../../public/icons/flag.svg?react';
import Tag from '../../../public/icons/tag.svg?react';
import Timer from '../../../public/icons/timer.svg?react';
import TrashCan from '../../../public/icons/trash.svg?react';

import { TaskCheckbox } from './TaskCheckbox';

const CATEGORIES = [
    {
        value: 'red',
        categoryClr: 'bg-category-red',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-red" />,
    },
    {
        value: 'orange',
        categoryClr: 'bg-category-orange',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-orange" />,
    },
    {
        value: 'yellow',
        categoryClr: 'bg-category-yellow-100',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-yellow-100" />,
    },
    {
        value: 'green',
        categoryClr: 'bg-category-green',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-green" />,
    },
    {
        value: 'turquiose',
        categoryClr: 'bg-category-turquiose',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-turquiose" />,
    },
    {
        value: 'blue-bright',
        categoryClr: 'bg-category-blue-100',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-blue-100" />,
    },
    {
        value: 'blue-darker',
        categoryClr: 'bg-category-blue-200',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-blue-200" />,
    },
    {
        value: 'purple-bright',
        categoryClr: 'bg-category-purple-100',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-purple-100" />,
    },
    {
        value: 'purple-darker',
        categoryClr: 'bg-category-purple-200',
        dotElement: <div className="w-5 h-5 rounded-full bg-category-purple-200" />,
    },
];

export type CategoriesType = {
    categoryClr: string | undefined;
    value: string | undefined;
};

export const TaskDetails = () => {
    const { id } = useParams();
    const { deleteTask, findSingleTask, singleTask, editTask } = useTasksContext();
    const navigate = useNavigate();
    const [categoryColor, setCategoryColor] = useState<string | undefined>(singleTask?.categoryClr);
    const [colorValue, setColorValue] = useState<string | undefined>(singleTask?.colorValue);
    const [value, onChange] = useState<string>('');

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: { ...singleTask },
    });

    const handleDelete = (id: number) => {
        deleteTask(id);
    };

    useEffect(() => {
        findSingleTask(Number(id));
        onChange(singleTask?.finalDate);
        setCategoryColor(singleTask?.categoryClr);
        setColorValue(singleTask?.colorValue);
    }, [findSingleTask, id, singleTask]);

    useEffect(() => {
        setValue('categoryClr', categoryColor);
        setValue('colorValue', colorValue);
    }, [setCategoryColor, setValue, colorValue, categoryColor]);

    const newDate = new Date(value);
    const testVal = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');

    useEffect(() => {
        setValue('finalDate', testVal);
    }, [value, setValue, testVal]);

    return (
        <>
            {singleTask && (
                <section className="h-full m-auto max-w-editPage flex flex-col gap-4 mt-10">
                    <button onClick={() => navigate(-1)}>
                        <IoIosArrowBack className="text-2xl hover:fill-bright-purple-100 focus:fill-bright-purple-300" />
                    </button>
                    <form onSubmit={handleSubmit((data) => editTask(singleTask.id, data))} className="">
                        <div>
                            <div className="flex gap-4 mb-4 items-center">
                                <TaskCheckbox task_title={singleTask.task_title} id={singleTask.id} isChecked={singleTask.done} />

                                <div className="w-full max-w-datePickerWidth">
                                    <label htmlFor="task-title" className="text-xs md:text-sm lg:text-base font-thin text-bright-purple-100 ">
                                        Task title
                                    </label>
                                    <input
                                        {...register('task_title')}
                                        defaultValue={singleTask?.task_title}
                                        name="task_title"
                                        className="  text-lg md:text-xl lg:text-2xl  rounded-lg  block w-full p-2.5 dark:bg-black-edit focus:dark:bg-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-100 mb-2"
                                    />
                                    <label htmlFor="task_description" className="text-xs md:text-sm lg:text-base font-thin text-bright-purple-100 ">
                                        Description
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        defaultValue={singleTask?.description}
                                        name="description"
                                        className=" text-sm md:text-md lg:text-xl text-light text-gray-300 rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block w-full p-2.5 dark:bg-black-edit focus:dark:bg-gray-300 dark:placeholder-gray-300 dark:text-gray-100 "
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="flex mb-5 ml-2 gap-2 justify-between">
                                    <div className="flex gap-2 min-w-fit ">
                                        <Timer className="w-6 h-6 min-w-fit	 fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                        <p className="mr-12">Task time</p>
                                    </div>

                                    <DateTimePicker
                                        onChange={onChange}
                                        value={value}
                                        disableClock
                                        clearIcon={null}
                                        calendarIcon={null}
                                        className=" border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block  dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100 "
                                    />
                                    <input type="hidden" {...register('finalDate')} />
                                </div>
                                <div className="flex mb-5 ml-2 gap-2 justify-between">
                                    <div className="flex gap-2 min-w-fit ">
                                        <Tag className="w-6 h-6 min-w-fit fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                        <p className="min-w-fit mr-12">Task category</p>
                                    </div>
                                    <input type="hidden" {...register('categoryClr')} />
                                    <input type="hidden" {...register('colorValue')} />

                                    <Dropdown label={<div className={`w-5 h-5 rounded-full ${categoryColor}`} />}>
                                        {CATEGORIES.map((category) => {
                                            return (
                                                <Dropdown.Item
                                                    key={category.categoryClr}
                                                    onClick={() => {
                                                        setCategoryColor(category.categoryClr);
                                                        setColorValue(category.value);
                                                    }}
                                                >
                                                    <div className={`w-5 h-5 rounded-full ${category?.categoryClr}`} />
                                                    <p className="ml-4 text-gray-100">{category.value}</p>
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown>
                                </div>
                                <div className="flex mb-5 ml-2 gap-2 justify-between">
                                    <div className="flex gap-2 min-w-fit ">
                                        <Flag className="w-6 h-6 min-w-fit fill-current text-white hover:text-bright-purple-100 cursor-pointer" />
                                        <p className="min-w-fit mr-12">Task priority</p>
                                    </div>
                                    <select
                                        defaultValue={singleTask.priority}
                                        className=" border border-gray-300 w-fit-content text-gray-900 text-sm rounded-lg focus:ring-bright-purple-100 focus:border-bright-purple-100 block  p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bright-purple-1000 dark:focus:border-bright-purple-100 text-center"
                                        {...register('priority')}
                                    >
                                        <option>{1}</option>
                                        <option>{2}</option>
                                        <option>{3}</option>
                                        <option>{4}</option>
                                    </select>
                                </div>
                                <div className="flex mb-5 ml-6 gap-2 justify-end">
                                    <button
                                        onClick={() => {
                                            navigate(-1);
                                            handleDelete(Number(id));
                                        }}
                                    >
                                        <TrashCan className="w-6 h-6 min-w-fit fill-current text-red-100 hover:text-red-600 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="focus:outline-none text-white bg-bright-purple-100 hover:bg-bright-purple-300 focus:ring-2 focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-bright-purple-100   dark:focus:ring-bright-purple-300 w-full"
                            >
                                Edit
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </>
    );
};
