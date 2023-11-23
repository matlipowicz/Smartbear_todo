import { ReactElement } from 'react';
import { Event } from 'react-big-calendar';

// TASK
export type TaskObjTypes = {
    categoryClr?: string;
    colorValue?: string;
    createdOn?: number;
    description?: string | undefined;
    done: boolean;
    finalDate: string | number;
    id?: number;
    priority: number;
    scheduledOn: string;
    task_title: string;
    time: string;
};

export type TaskListProps = {
    setFilterPriority: React.Dispatch<React.SetStateAction<number | undefined>>;
    sorting: string;
    sortingAscendently: () => void;
    sortingDescendently: () => void;
    tasks: TaskObjTypes[];
};

export type TaskCheckboxProps = {
    id: number | undefined;
    isChecked: boolean | undefined;
    task_title: string | undefined;
};
// CALENDAR
export type DataType = {
    description?: string | undefined;
    done?: boolean;
    id?: number | undefined;
    time?: string;
    title?: any;
};
export type EventsType = {
    data?: DataType;
    end: Date;
    start: Date;
};

export type CalendarEventProps = {
    event: EventsType;
    openEventModal: (e: React.SyntheticEvent) => void;
};

export type CustomCalendarTypes = {
    events: EventsType[];
    onSelectEvent: (event: EventsType, e: React.SyntheticEvent<Element, Event>) => void;
    openEventModal: (e: React.SyntheticEvent) => void;
};

export type CompotentsType = {
    day: {
        event: ({ event }: { event: EventsType }) => JSX.Element;
    };
    month: {
        event: ({ event }: { event: EventsType }) => JSX.Element;
    };
    week: {
        event: ({ event }: { event: EventsType }) => JSX.Element;
    };
};

// DATE PICKER

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// GROUPS

export type CategoryType = { category: string; color: string | undefined };

// ROUTES
export type RouteTypes = {
    icon: ReactElement;
    id: number;
    name: string;
    path: string;
};

export type CategoriesType = {
    categoryClr: string | undefined;
    value: string | undefined;
};

// MODALS
export type EventModalTypes = {
    closeEventModal: () => void;
    currentEventData: TaskObjTypes | null;
    eventOpen: boolean;
    position: { left: number; top: number };
};
