import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

import { ROUTES } from '../MainLayout';
import { RouteTypes } from '../MainLayout';

export type CategoryType = { category: string; color: string };
export function DesktopLayout({
    menuState,
    setMenuState,
    open,
}: {
    menuState: boolean;
    open: () => void;
    setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { tasks } = useTasksContext();
    const [category, setCategory] = useState<CategoryType[]>([]);

    useEffect(() => {
        const colorValueSet = new Set();
        tasks.forEach((task) => {
            if (task.colorValue) {
                colorValueSet.add({ category: task.colorValue, color: task.categoryClr });
            }
        });

        setCategory(Array.from(colorValueSet) as CategoryType[]);
    }, [tasks]);

    return (
        <nav className="hidden lg:block ">
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 py-14 overflow-y-auto transition-transform duration-500 ${
                    menuState ? 'translate-x-1/6' : '-translate-x-full'
                } bg-white dark:bg-gray-200  `}
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
            >
                <button
                    type="button"
                    className="text-gray-400  hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white"
                    onClick={() => setMenuState(false)}
                >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 flex flex-col gap-6">
                        {ROUTES.map((route: RouteTypes) => {
                            return (
                                <li key={route.id} className="flex flex-col ">
                                    <NavLink
                                        to={route.path}
                                        className={({ isActive }) => (isActive ? 'text-bright-purple-100 fill-red-100' : 'flex flex-col gap-10')}
                                    >
                                        <div className="flex gap-2 items-center  group">
                                            {route.icon}
                                            <p className="group-hover:text-bright-purple-100 text-xs sm:text-sm md:text-base lg:text-lg lg:font-light	">
                                                {route.name}
                                            </p>
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="border border-top border-white/20 mt-4 mb-4" />
                <section>
                    {category.map((colorCategory) => {
                        if (colorCategory) {
                            return (
                                <div
                                    key={colorCategory.color}
                                    onClick={() => console.log(colorCategory.color)}
                                    className="flex gap-4 p-4 cursor-pointer "
                                    aria-hidden="true"
                                >
                                    <p className={`w-5 h-5 rounded-full ${colorCategory.color}`} />
                                    <h3 className="hover:text-gray-100/60 focus:text-gray-100/60">{colorCategory.category}</h3>
                                </div>
                            );
                        }
                    })}
                </section>
            </div>
            <button
                onClick={open}
                disabled={
                    location.pathname !== '/' &&
                    location.pathname !== '/calendar' &&
                    location.pathname !== '/all-tasks' &&
                    location.pathname !== '/calendar'
                        ? true
                        : false
                }
                className="w-16 h-16  bg-bright-purple-100 rounded-full  right-1/2 translate-x-1/2 -translate-y-1/2 hover:bg-bright-purple-300 text-3xl lg:absolute lg:bottom-5 lg:right-20 "
            >
                +
            </button>
        </nav>
    );
}
