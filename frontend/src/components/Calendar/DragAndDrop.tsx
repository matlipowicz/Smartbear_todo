import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { TaskObjTypes } from 'src/types/types';

import { BigCustomCalendar } from './BigCustomCalendar';

type DataType = {
    description: string;
    done: boolean;
    id: number;
    time: string;
    title: string;
};
export type EventsType = {
    data: DataType;
    end: Date;
    start: Date;
};

export const DragAndDrop = ({ openEventModal, onSelectEvent }: any) => {
    const { tasks } = useTasksContext();
    const [events, setEvents] = useState<EventsType[]>([]);

    useEffect(() => {
        const event = tasks.map((task: TaskObjTypes) => {
            const multipliedDate = (task?.finalDate as number) * 1000;
            const formattedDate = new Date(multipliedDate);
            const formatDate = moment(formattedDate).toDate();
            return {
                start: formatDate,
                end: formatDate,
                data: {
                    id: task.id,
                    title: task.task_title,
                    done: task.done,
                    description: task.description,
                    time: task.time,
                },
            };
        });
        setEvents(event);
    }, [tasks]);

    return <BigCustomCalendar events={events} openEventModal={openEventModal} onSelectEvent={onSelectEvent} />;
};
