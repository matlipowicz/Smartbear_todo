// import logo from '../../public/icons/logo.svg';
import React from 'react';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
        path: '/',
        name: 'Home',
        icon: <Home className="w-6 h-6 fill-current text-white group-hover:text-bright-purple-100  " />,
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
    return (
        <>
            <div className="w-full h-screen grid grid-cols-1 grid-rows-main-rows text-white">
                <header className="px-6 pt-3.5 flex  justify-between align-baseline mb-12">
                    <Sort className="w-8 h-8 fill-current text-white hover:text-bright-purple-100 self-center cursor-pointer	" />
                    <NavLink to="/">
                        <img src={logo} alt="logo" className="w-10 h-10  cursor-pointer" />
                    </NavLink>
                    {/* TODO: Profile avatar */}
                    {/* <div className="rounded-full h-12 w-12 bg-red-100" /> */}
                </header>

                <main className="px-6">{children}</main>

                <footer className="w-screen bg-gray-200 h-25 self-end px-6 pb-3.5 relative">
                    <button
                        onClick={open}
                        disabled={location.pathname !== '/' ? true : false}
                        className="w-16 h-16  bg-bright-purple-100 rounded-full  absolute  right-1/2 translate-x-1/2 -translate-y-1/2 hover:bg-bright-purple-300 text-3xl"
                    >
                        +
                    </button>
                    <div className="flex h-full w-full direction-col justify-between items-center mt-3">
                        {ROUTES.map((route: RouteTypes) => {
                            return (
                                <div key={route.id}>
                                    <NavLink to={route.path} className={({ isActive }) => (isActive ? 'text-bright-purple-100 fill-red-100' : '')}>
                                        <div className="flex flex-col items-center gap-2 group">
                                            {route.icon}
                                            <p className="group-hover:text-bright-purple-100 text-xs">{route.name} </p>
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </footer>
            </div>
        </>
    );
};
