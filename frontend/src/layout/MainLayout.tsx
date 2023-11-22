// import logo from '../../public/icons/logo.svg';
import React from 'react';
import { ReactElement } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { useMenuContext } from 'src/context/MenuContext/MenuContext';
import { useModalContext } from 'src/context/ModalContext/ModalContext';

import Calendar from '../../public/icons/calendar.svg?react';
import Clock from '../../public/icons/clock.svg?react';
import Home from '../../public/icons/home.svg?react';

import { DesktopLayout } from './desktop/Desktop';
import { MobileLayout } from './mobile/Mobile';
import { StaticHeader } from './static/StaticHeader';

type ChildrienProps = {
    children: React.ReactNode;
};

export type RouteTypes = {
    icon: ReactElement;
    id: number;
    name: string;
    path: string;
};

export const ROUTES: RouteTypes[] = [
    {
        id: 1,
        path: '/',
        name: 'Home',
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
        name: 'Stats',
        icon: <FiBarChart2 className="w-6 h-6 fill-current text-white group-hover:text-bright-purple-100  " />,
    },
];

export const MainLayout = ({ children }: ChildrienProps) => {
    const { open } = useModalContext();
    const { openMenu, setOpenMenu } = useMenuContext();

    return (
        <>
            <div className="w-full  h-screen grid grid-cols-1 grid-rows-mobile-main-rows text-white lg:grid-rows-desktop-main-rows lg:flex	lg:flex-col lg:justify-stretch ">
                <StaticHeader setOpenMenu={setOpenMenu} />
                <main className={`px-6 ${openMenu ? 'lg:ml-64 duration-500' : 'duration-700	'} h-full overflow-y-scroll	`}>{children}</main>

                <MobileLayout open={open} />
                <DesktopLayout menuState={openMenu} setMenuState={setOpenMenu} open={open} />
            </div>
        </>
    );
};
