import { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TimePicker } from 'react-time-picker';
import { LooseValue } from 'react-time-picker/dist/cjs/shared/types';

import { TaskObjTypes } from '../TaskModal/TaskModal';

import 'react-time-picker/dist/TimePicker.css';

export const Time = ({
    register,
    setValue,
}: {
    errors: FieldErrors<TaskObjTypes>;
    register: UseFormRegister<TaskObjTypes>;
    setValue: UseFormSetValue<TaskObjTypes>;
}) => {
    const [value, onChange] = useState<LooseValue | string>('');
    useEffect(() => {
        setValue('time', String(value));
    }, [value, setValue]);

    return (
        <>
            <input type="hidden" {...register('time')} name="time" />
            <TimePicker
                onChange={onChange}
                value={value}
                disableClock
                clearIcon={''}
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                name="time"
                secondAriaLabel="Second"
            />
        </>
    );
};
