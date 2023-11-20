import { useCallback, useEffect, useState } from 'react';
import { DragAndDrop, EventsType } from 'src/components/Calendar/DragAndDrop';
import { EventModal } from 'src/components/TaskModal/EventModal';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';

export const Calendar = () => {
    const { tasks } = useTasksContext();
    const [eventOpen, setEventOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<object>({ top: 0, left: 0 });
    const [calEvent, setCalEvent] = useState<EventsType | null>(null);
    const [currentEventData, setCurrentEventData] = useState(null);

    const onSelectEvent = useCallback((e: Event) => {
        // clickRef.current = console.log(calEvent);
        setCalEvent(e);
    }, []);

    useEffect(() => {
        tasks.filter((task) => {
            if (task.id === calEvent?.data.id) setCurrentEventData(task);
        });
    }, [tasks, calEvent]);

    function openEventModal(e: Event) {
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
            <div className="h-full w-full p-12">
                <DragAndDrop openEventModal={openEventModal} onSelectEvent={onSelectEvent} />
                <EventModal closeEventModal={closeEventModal} eventOpen={eventOpen} position={position} currentEventData={currentEventData} />
            </div>
        </>
    );
};
