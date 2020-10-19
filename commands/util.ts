// Assists on getting day by string name with Date.getDay()
export const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

/**
 * Returns the current day as a string.
 *
 * @returns <string> today as a string
 */
export const todayAsString = () => {
    return weekDays[new Date().getDay() - 1];
};

/**
 * Returns whether the input is a valid day of the week.
 *
 * @param <string> input
 * @returns <boolean> true or false
 */
export const isDay = (input: string) => {
    return weekDays.map((e) => e.toLowerCase()).includes(input.toLowerCase());
};

/**
 * Returns the class start time (hour) from the time string.
 *
 * @returns <string|boolean> start time or false
 */
export const getStartHour = (input: string) => {
    return input.match(/(\d{2}):\d{2} - \d{2}:\d{2}/)[1] || false;
};

type DailyTimetable = {
    name: string;
    schedule: { time: string; subject: string }[];
};

export const weeklySchedule: DailyTimetable[] = [
    {
        name: 'Monday',
        schedule: [
            {
                time: '10:00 - 12:00',
                subject: 'Advanced Internet Technologies',
            },
            { time: '13:00 - 15:00', subject: 'Advanced Databases' },
            { time: '15:00 - 17:00', subject: 'Team Project' },
        ],
    },
    {
        name: 'Tuesday',
        schedule: [
            { time: '09:00 - 11:00', subject: 'Advanced Programming' },
            { time: '14:00 - 16:00', subject: 'Team Project' },
            { time: '18:00 - 20:00', subject: 'Wireless Networking' },
        ],
    },
    {
        name: 'Wednesday',
        schedule: [
            { time: '09:00 - 11:00', subject: 'Advanced Programming' },
            { time: '11:00 - 13:00', subject: 'Team Project' },
        ],
    },
    {
        name: 'Thursday',
        schedule: [
            {
                time: '09:00 - 10:00',
                subject: 'Advanced Internet Technologies',
            },
            { time: '10:00 - 12:00', subject: 'Work Placement' },
            { time: '14:00 - 15:00', subject: 'Advanced Databases' },
            { time: '15:00 - 17:00', subject: 'Data Structures' },
        ],
    },
];
