import { useState } from 'react';
// import Datepicker from 'tailwind-datepicker-react';
// import { DatePicker as ReactDatePicker } from 'react-date-picker';
import Calendar from 'react-calendar';
import { UseFormRegister } from 'react-hook-form';

import { TaskObjTypes } from '../TaskModal/TaskModal';

import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePicker = ({ register }: { register: UseFormRegister<TaskObjTypes> }) => {
    const [value, onChange] = useState<Value>(new Date());
    console.log(value);
    return (
        <>
            <input value={String(value)} className="hidden" readOnly />
            <Calendar onChange={onChange} value={value} {...register('scheduledOn')} />
        </>
    );
};
