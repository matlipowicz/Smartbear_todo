import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteTodo } from 'src/api/todos';
import { EventModalTypes } from 'src/types/types';

import Edit from '../../../../public/icons/edit-2.svg?react';
import TrashCan from '../../../../public/icons/trash.svg?react';

export const DesktopEventModal = ({ position, currentEventData, closeEventModal }: EventModalTypes) => {
    return (
        <>
            {currentEventData ? (
                <div
                    className={`hidden md:block absolute bg-white rounded-lg shadow dark:bg-gray-300 md:max-w-lg transition-all duration-500`}
                    style={{ top: position.top, left: position.left }}
                >
                    <div className="  flex items-center justify-between p-4 md:p-5 ">
                        <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white break-words w-3/4">
                            {currentEventData.task_title}
                        </h3>
                        <div className="flex gap-4 top-2 right-2 self-start">
                            <Link to={`${currentEventData.id}`} className="self-center">
                                <Edit className="w-5 h-5 md:w-6 md:h-6 min-w-fit fill-current text-white hover:text-bright-purple-300 cursor-pointer" />
                            </Link>
                            <button
                                onClick={() => {
                                    closeEventModal();
                                    deleteTodo(currentEventData.id);
                                }}
                            >
                                <TrashCan className="w-5 h-5 md:w-6 md:h-6 min-w-fit fill-current text-red-100 hover:text-red-600 cursor-pointer" />
                            </button>
                            <button
                                type="button"
                                className="text-bright-purple-300 hover:bg-bright-purple-300 hover:text-white rounded-md text-sm p-1.5  items-center dark:hover:bg-bright-purple-300 dark:hover:text-white "
                                onClick={closeEventModal}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-6">
                        <p className="text-xs md:text-sm lg:text-base font-extralight text-gray-100">
                            {moment(currentEventData.finalDate).format('LLL')}
                        </p>
                        <p className="text-gray-100 text-sm md:text-base lg:text-lg ">{currentEventData.description}</p>
                    </div>
                </div>
            ) : null}
        </>
    );
};
