import { useCallback, useEffect, useState } from 'react';
import { DragAndDrop } from 'src/components/Calendar/DragAndDrop';
import { EventModal } from 'src/components/TaskModal/CalendarEvent/EventModal';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { EventsType, TaskObjTypes } from 'src/types/types';

export const Calendar = () => {
    const { tasks } = useTasksContext();
    const [eventOpen, setEventOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<{ left: number; top: number }>({ top: 0, left: 0 });
    const [calEvent, setCalEvent] = useState<EventsType | null>(null);
    const [currentEventData, setCurrentEventData] = useState<TaskObjTypes | null>(null);

    const onSelectEvent = useCallback((events: EventsType, e: React.SyntheticEvent<Element, Event>) => {
        setCalEvent(events);
        console.log(e);
    }, []);

    useEffect(() => {
        tasks.filter((task) => {
            if (task.id === calEvent?.data?.id) setCurrentEventData(task);
        });
    }, [tasks, calEvent]);

    function openEventModal(e: React.SyntheticEvent) {
        const event = e.target as HTMLElement;
        const rect = event.getBoundingClientRect();
        setPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX - 200,
        });
        setEventOpen(true);
    }

    function closeEventModal() {
        setEventOpen(false);
    }
    return (
        <>
            <div className=" h-full w-full p-2 pb-20 sm:p-6 sm:pb-8 lg:p-8 lg:pb-10 xl:p-12 xl:pt-0">
                <DragAndDrop openEventModal={openEventModal} onSelectEvent={onSelectEvent as any} />
                <div className="hidder">
                    <EventModal closeEventModal={closeEventModal} eventOpen={eventOpen} position={position} currentEventData={currentEventData} />
                </div>
            </div>
        </>
    );
};
