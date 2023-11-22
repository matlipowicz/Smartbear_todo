import { NavLink } from 'react-router-dom';

import { ROUTES } from '../MainLayout';
import { RouteTypes } from '../MainLayout';

export const MobileLayout = ({ open }: { open: () => void }) => {
    return (
        <nav className="w-screen bg-gray-200 h-25 self-end px-6 pb-3.5 relative sm:flex lg:hidden">
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
    );
};
