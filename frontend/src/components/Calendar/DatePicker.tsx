import { useEffect, useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';
// import Datepicker from 'tailwind-datepicker-react';
// import { DatePicker as ReactDatePicker } from 'react-date-picker';
import Calendar from 'react-calendar';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { TaskObjTypes } from '../TaskModal/TaskModal';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePicker = ({
    register,
    setValue,
    errors,
}: {
    errors: FieldErrors<TaskObjTypes>;
    register: UseFormRegister<TaskObjTypes>;
    setValue: UseFormSetValue<TaskObjTypes>;
}) => {
    const [value, onChange] = useState<Value | string>('');
    useEffect(() => {
        setValue('scheduledOn', String(value));
    }, [value, setValue]);

    return (
        <>
            <input type="hidden" {...register('scheduledOn')} name="scheduledOn" />
            <Calendar onChange={onChange} value={value} />

            {errors?.scheduledOn && <p className="text-red-100 text-sm">{errors?.scheduledOn?.message} &uarr;</p>}
            {/* <DateTimePicker onChange={onChange} value={value} /> */}
        </>
    );
};
