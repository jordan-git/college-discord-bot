import * as dotenv from 'dotenv';
import { GuildMember } from 'discord.js';

// Store .env variables in process.env
dotenv.config();

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

export const getIdFromMessage = (content: string) => {
    if (!content) return;

    if (content.match(/^[0-9]{18}/) != null) return content;

    if (content.startsWith('<#') && content.endsWith('>')) {
        content = content.slice(2, -1);

        if (content.startsWith('!')) {
            content = content.slice(1);
        }

        return content;
    }
};

export const isAdmin = (member: GuildMember) => {
    for (let adminRole of process.env.ADMIN_ROLES.split(',')) {
        if (member.roles.cache.has(adminRole)) return true;
    }
    return false;
};

type DailyTimetable = {
    name: string;
    schedule: { time: string; subject: string; moodle?: string }[];
};

export const weeklySchedule: DailyTimetable[] = [
    {
        name: 'Monday',
        schedule: [
            {
                time: '10:00 - 12:00',
                subject: 'Advanced Internet Technologies',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=57',
            },
            {
                time: '13:00 - 15:00',
                subject: 'Advanced Databases',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=137',
            },
            {
                time: '15:00 - 17:00',
                subject: 'Team Project',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=58',
            },
        ],
    },
    {
        name: 'Tuesday',
        schedule: [
            {
                time: '09:00 - 11:00',
                subject: 'Advanced Programming',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=567',
            },
            {
                time: '14:00 - 16:00',
                subject: 'Team Project',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=58',
            },
            {
                time: '18:00 - 20:00',
                subject: 'Wireless Networking',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=568',
            },
        ],
    },
    {
        name: 'Wednesday',
        schedule: [
            {
                time: '09:00 - 11:00',
                subject: 'Advanced Programming',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=567',
            },
            {
                time: '11:00 - 13:00',
                subject: 'Team Project',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=58',
            },
        ],
    },
    {
        name: 'Thursday',
        schedule: [
            {
                time: '09:00 - 10:00',
                subject: 'Advanced Internet Technologies',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=57',
            },
            {
                time: '10:00 - 12:00',
                subject: 'Work Placement',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=440',
            },
            {
                time: '14:00 - 15:00',
                subject: 'Advanced Databases',
                moodle: 'https://mymoodle.ncirl.ie/course/view.php?id=137',
            },
            {
                time: '15:00 - 17:00',
                subject: 'Data Structures',
            },
        ],
    },
];
