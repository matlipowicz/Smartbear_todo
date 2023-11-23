import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

import capybara from '../../../public/graphics/capybara-fav.svg';

export const StaticHeader = ({ setOpenMenu }: { setOpenMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <header className="px-6 pt-3.5 flex  justify-between align-baseline mb-12">
                <button className="h-min hidden lg:flex" onClick={() => setOpenMenu(true)}>
                    <RxHamburgerMenu className=" w-10 h-10 cursor-pointer hover:text-bright-purple-100 hover:bg-gray-200/30 focus:text-bright-purple-100 focus:bg-gray-200/30 rounder-md p-1" />
                </button>
                <NavLink to="/" className="h-min">
                    <img src={capybara} alt="logo" className="w-10 h-10 lg:w-12 lg:h-12  cursor-pointer hover:brightness-125 " />
                </NavLink>
            </header>
        </>
    );
};
