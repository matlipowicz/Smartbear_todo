import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import { BigCalendarEventDay, BigCalendarEventMonth, BigCalendarEventWeek } from './BigCalendarEvent';
import { EventsType } from './DragAndDrop';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

export const BigCustomCalendar = ({ events, openEventModal, onSelectEvent }: { events: EventsType[]; onSelectEvent: any; openEventModal: any }) => {
    // const [eventOpen, setEventOpen] = useState<boolean>(false);

    const components = {
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
            <DnDCalendar components={components} showAllEvents events={events} localizer={localizer} onSelectEvent={onSelectEvent} />
        </>
    );
};
