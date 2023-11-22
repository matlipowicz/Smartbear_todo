import { useEffect, useState } from 'react';
import moment from 'moment';
import { useTasksContext } from 'src/context/ModalContext/TasksContext';
import { TaskObjTypes } from 'src/types/types';

// * STATS DATA HOOK
export const useStatsData = () => {
    const { tasks } = useTasksContext();
    const [doneTasks, setDoneTasks] = useState<TaskObjTypes[]>([]);
    const [undoneTasks, setUndoneTasks] = useState<TaskObjTypes[]>([]);
    const [currWeek, setCurrWeek] = useState<string[]>([]);
    const [weekTasks, setWeekTasks] = useState<TaskObjTypes[]>([]);
    const [weekDoneTasks, setWeekDoneTasks] = useState<TaskObjTypes[]>([]);
    const [weekPendingTasks, setWeekPendingTasks] = useState<TaskObjTypes[]>([]);

    //! TODAY TASKS
    useEffect(() => {
        const done = tasks.filter((task) => {
            const today = new Date();
            const taskDate = new Date(task.finalDate);
            if (task.done && today.toDateString() === taskDate.toDateString()) {
                return task;
            }
        });

        setDoneTasks(done);

        const pending = tasks.filter((task) => {
            const today = new Date();
            const taskDate = new Date(task.finalDate);
            if (!task.done && today.toDateString() === taskDate.toDateString()) {
                return task;
            }
        });

        setUndoneTasks(pending);
    }, [tasks]);

    useEffect(() => {
        setCurrWeek(getCurrentWeekDates());
    }, []);

    useEffect(() => {
        const matchingWeekTasks = tasks.filter((task) => {
            const stringDate = moment(task.finalDate).format('YYYY-MM-DD');
            if (currWeek.includes(stringDate)) {
                return task;
            }
        });

        setWeekTasks(matchingWeekTasks);
    }, [currWeek, tasks]);

    useEffect(() => {
        const done = weekTasks.filter((task) => {
            if (task.done) {
                return task;
            }
        });

        setWeekDoneTasks(done);

        const pending = weekTasks.filter((task) => {
            if (!task.done) {
                return task;
            }
        });

        setWeekPendingTasks(pending);
    }, [weekTasks]);

    function getCurrentWeekDates() {
        const startOfWeek = moment().startOf('week'); // Start of the current week
        const endOfWeek = moment().endOf('week'); // End of the current week

        const dates = [];
        let current = startOfWeek;

        while (current <= endOfWeek) {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.clone().add(1, 'day');
        }
        return dates;
    }

    //! Number of task divided to daily and weekly
    const numberOfDoneTodayTasks = doneTasks.length;
    const numberOfPendingTodayTasks = undoneTasks.length;
    const numberOfDoneWeekTasks = weekDoneTasks.length;
    const numberOfPendingWeekTasks = weekPendingTasks.length;

    //! Percent of done tasks daily and weekly
    const todayDoneTasksPercent: number = Math.round((numberOfDoneTodayTasks / (numberOfDoneTodayTasks + numberOfPendingTodayTasks)) * 100);
    const weekDoneTasksPercent: number = Math.round((numberOfDoneWeekTasks / (numberOfDoneWeekTasks + numberOfPendingWeekTasks)) * 100);

    const todayData = {
        labels: ['Pending', 'Done'],
        datasets: [
            {
                label: `task`,
                data: [numberOfPendingTodayTasks, numberOfDoneTodayTasks],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };
    const weekData = {
        labels: ['Pending', 'Done'],
        datasets: [
            {
                label: `task`,
                data: [numberOfPendingWeekTasks, numberOfDoneWeekTasks],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainaspectratio: false,
    };

    return { todayData, weekData, options, todayDoneTasksPercent, weekDoneTasksPercent };
};
