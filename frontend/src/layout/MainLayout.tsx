// import logo from '../../public/icons/logo.svg';
import React from 'react';
import { ReactElement } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMenuContext } from 'src/context/MenuContext/MenuContext';
import { useModalContext } from 'src/context/ModalContext/ModalContext';

import Calendar from '../../public/icons/calendar.svg?react';
import Clock from '../../public/icons/clock.svg?react';
import Home from '../../public/icons/home.svg?react';
import logo from '../../public/icons/logo.svg';
import Sort from '../../public/icons/sort.svg?react';
import User from '../../public/icons/user.svg?react';

type ChildrienProps = {
    children: React.ReactNode;
};

type RouteTypes = {
    icon: ReactElement;
    id: number;
    name: string;
    path: string;
};

const ROUTES: RouteTypes[] = [
    {
        id: 1,
        path: '/tasks',
        name: 'Task list',
        icon: <Home className="w-6  h-6 fill-current text-white group-hover:text-bright-purple-100  " />,
    },
    {
        id: 2,
        path: '/calendar',
        name: 'Calendar',
        icon: <Calendar className="w-6 h-6 fill-current text-white group-hover:fill-bright-purple-100 " />,
    },
    {
        id: 3,
        path: '/all-tasks',
        name: 'All tasks',
        icon: <Clock className="w-6 h-6 fill-current text-white group-hover:text-bright-purple-100  " />,
    },
    {
        id: 4,
        path: '/profile',
        name: 'User',
        icon: <User className="w-6 h-6 fill-current text-white group-hover:text-bright-purple-100  " />,
    },
];

export const MainLayout = ({ children }: ChildrienProps) => {
    const { open } = useModalContext();
    const location = useLocation();
    const { openMenu, setOpenMenu } = useMenuContext();
    return (
        <>
            <div className="w-full  h-screen grid grid-cols-1 grid-rows-mobile-main-rows text-white lg:grid-rows-desktop-main-rows lg:flex	lg:flex-col lg:justify-stretch ">
                <header className="px-6 pt-3.5 flex  justify-between align-baseline mb-12">
                    <Sort className="w-8 h-8 fill-current text-white hover:text-bright-purple-100 self-center cursor-pointer lg:hidden" />
                    <button className="h-min hidden lg:flex" onClick={() => setOpenMenu(true)}>
                        <RxHamburgerMenu className=" w-10 h-10 cursor-pointer hover:text-bright-purple-100 hover:bg-gray-200/30 focus:text-bright-purple-100 focus:bg-gray-200/30 rounder-md p-1" />
                    </button>
                    <NavLink to="/tasks" className="h-min">
                        <img src={logo} alt="logo" className="w-10 h-10  cursor-pointer " />
                    </NavLink>
                    {/* TODO: Profile avatar */}
                    {/* <div className="rounded-full h-12 w-12 bg-red-100" /> */}
                </header>

                <main className={`px-6 ${openMenu ? 'lg:ml-64 duration-500' : 'duration-700	'} h-full `}>{children}</main>

                <nav className="w-screen bg-gray-200 h-25 self-end px-6 pb-3.5 relative sm:flex lg:hidden">
                    <button
                        onClick={open}
                        disabled={location.pathname !== '/tasks' ? true : false}
                        className="w-16 h-16  bg-bright-purple-100 rounded-full  absolute  right-1/2 translate-x-1/2 -translate-y-1/2 hover:bg-bright-purple-300 text-3xl lg:fixed lg:bottom-2 lg:right-2"
                    >
                        +
                    </button>
                    <ul className="flex h-full w-full direction-col justify-between items-center mt-3 ">
                        {ROUTES.map((route: RouteTypes) => {
                            return (
                                <li key={route.id}>
                                    <NavLink to={route.path} className={({ isActive }) => (isActive ? 'text-bright-purple-100 fill-red-100' : '')}>
                                        <div className="flex flex-col items-center gap-2 group">
                                            {route.icon}
                                            <p className="group-hover:text-bright-purple-100 text-xs font-light sm:text-sm md:text-base lg:text-lg	">
                                                {route.name}
                                            </p>
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <DesktopLayout menuState={openMenu} setMenuState={setOpenMenu} open={open} />
            </div>
        </>
    );
};

// TODO: move to component
export function DesktopLayout({
    menuState,
    setMenuState,
    open,
}: {
    menuState: boolean;
    open: () => void;
    setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
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
                    <h3>Groups</h3>
                </section>
            </div>
            <button
                onClick={open}
                disabled={location.pathname !== '/' ? true : false}
                className="w-16 h-16  bg-bright-purple-100 rounded-full  right-1/2 translate-x-1/2 -translate-y-1/2 hover:bg-bright-purple-300 text-3xl lg:absolute lg:bottom-5 lg:right-20 "
            >
                +
            </button>
        </nav>
    );
}
