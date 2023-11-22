import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useStatsData } from 'src/hooks/useStatsData';

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
    const { todayData, weekData, options, todayDoneTasksPercent, weekDoneTasksPercent } = useStatsData();
    const [period, setPeriod] = useState<string>('daily');

    return (
        <section className="flex flex-col items-center justify-center gap-8 pt-12">
            <div className="flex gap-6">
                <button
                    type="button"
                    onClick={() => setPeriod('daily')}
                    className="text-bright-purple-100 hover:text-white border border--bright-purple-100 hover:bg-bright-purple-200 focus:ring-1 focus:outline-none focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-bright-purple-100 dark:textbright-purple-100 dark:hover:text-white dark:hover:bg-bright-purple-200 dark:focus:ring-bright-purple-300"
                >
                    Daily
                </button>
                <button
                    type="button"
                    onClick={() => setPeriod('weekly')}
                    className="text-bright-purple-100 hover:text-white border border--bright-purple-100 hover:bg-bright-purple-200 focus:ring-1 focus:outline-none focus:ring-bright-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-bright-purple-100 dark:textbright-purple-100 dark:hover:text-white dark:hover:bg-bright-purple-200 dark:focus:ring-bright-purple-300"
                >
                    Weekly
                </button>
            </div>
            {period === 'daily' ? (
                <>
                    <p className="text-center text-stats-green text-4xl">{todayDoneTasksPercent}%</p>
                    <p className="flex flex-col text-center text-stats-green font-thin text-2xl">
                        tasks completed <span className="text-lg text-stats-green font-bold">Good Job!</span>
                    </p>
                    <Doughnut data={todayData} options={options} className="min-w-doughnut max-w-doughnut max-h-doughnut " />
                </>
            ) : (
                <>
                    <p className="text-center text-stats-green text-4xl">{weekDoneTasksPercent}%</p>
                    <p className="flex flex-col text-center text-stats-green font-thin text-2xl">
                        tasks completed <span className="text-lg text-stats-green font-bold">Good Job!</span>
                    </p>
                    <Doughnut data={weekData} options={options} className="min-w-doughnut max-w-doughnut max-h-doughnut " />
                </>
            )}
        </section>
    );
};

export default Stats;
