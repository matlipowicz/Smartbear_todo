import { EventsType } from './DragAndDrop';

type CalendarEventProps = {
    event: EventsType;
    openEventModal: () => void;
};

export const BigCalendarEventMonth = ({ event, openEventModal }: CalendarEventProps) => {
    if (event)
        return (
            <>
                <div
                    className={`p-2 ${
                        event.data.done === true
                            ? 'bg-complete-task-green/75 hover:bg-complete-task-green focus:bg-complete-task-green active:bg-complete-task-green'
                            : 'bg-complete-task-red/75 hover:bg-complete-task-red focus:bg-complete-task-red active:bg-complete-task-red'
                    } rounded-md break-words w-full h-full relative`}
                    onClick={openEventModal}
                    aria-hidden="true"
                >
                    <p className="text-sm md:text-xl text-gray-400 font-bold">{event.data.title}</p>
                    <p className="text-xs md:text-base text-gray-300">{event.data.description}</p>
                    <p className="text-xs md:text-sm text-gray-400">{event.data.time}</p>
                </div>
            </>
        );
};

export const BigCalendarEventWeek = ({ event, openEventModal }: CalendarEventProps) => {
    if (event)
        return (
            <>
                <div
                    className={` ${
                        event.data.done === true
                            ? 'bg-complete-task-green/75 hover:bg-complete-task-green focus:bg-complete-task-green active:bg-complete-task-green'
                            : 'bg-complete-task-red/75 hover:bg-complete-task-red focus:bg-complete-task-red active:bg-complete-task-red'
                    } rounded-md break-words w-full`}
                    onClick={openEventModal}
                    aria-hidden="true"
                >
                    <p className="text-sm text-gray-400 font-bold ">{event.data.title}</p>
                </div>
            </>
        );
};
export const BigCalendarEventDay = ({ event, openEventModal }: CalendarEventProps) => {
    if (event)
        return (
            <>
                <div
                    className={` ${
                        event.data.done === true
                            ? 'bg-complete-task-green/75 hover:bg-complete-task-green focus:bg-complete-task-green active:bg-complete-task-green'
                            : 'bg-complete-task-red/75 hover:bg-complete-task-red focus:bg-complete-task-red active:bg-complete-task-red'
                    } rounded-md break-words w-full`}
                    onClick={openEventModal}
                    aria-hidden="true"
                >
                    <p className="text-sm text-gray-400 font-bold ">{event.data.title}</p>
                </div>
            </>
        );
};
