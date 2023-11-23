import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { CompotentsType, EventsType } from 'src/types/types';

import { BigCalendarEventDay, BigCalendarEventMonth, BigCalendarEventWeek } from './BigCalendarEvent';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

export const BigCustomCalendar = ({
    events,
    onSelectEvent,
    openEventModal,
}: {
    events: EventsType[];
    onSelectEvent: (e: React.SyntheticEvent, event: EventsType) => void;
    openEventModal: (e: React.SyntheticEvent) => void;
}) => {
    const components: CompotentsType = {
        month: {
            event: ({ event }: { event: EventsType }) => {
                return <BigCalendarEventMonth event={event} openEventModal={openEventModal} />;
            },
        },

        week: {
            event: ({ event }: { event: EventsType }) => {
                return <BigCalendarEventWeek event={event} openEventModal={openEventModal} />;
            },
        },
        day: {
            event: ({ event }: { event: EventsType }) => {
                return <BigCalendarEventDay event={event} openEventModal={openEventModal} />;
            },
        },
    };

    return (
        <>
            <DnDCalendar
                components={components as object}
                showAllEvents
                events={events}
                localizer={localizer}
                onSelectEvent={onSelectEvent as any}
                views={['month', 'week', 'day']}
            />
        </>
    );
};
