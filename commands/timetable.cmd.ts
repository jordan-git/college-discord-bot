import { MessageEmbed } from 'discord.js';
import { Command } from './command';

// Assists on getting day by string name with Date.getDay()
const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

type DailyTimetable = {
    name: string;
    schedule: { time: string; subject: string }[];
};

const weeklySchedule: DailyTimetable[] = [
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

export const command: Command = {
    name: 'timetable',
    description: 'Timetable',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Timetable')
            // .setAuthor('College Assistant')
            // .setDescription('Description')
            .setThumbnail('https://i.imgur.com/am7FRar.png')
            .setTimestamp()
            .setFooter('Footer');

        if (args.length === 0) {
            for (const day of weeklySchedule) {
                if (day.name === weekDays[new Date().getDay()]) {
                    for (const _class of day.schedule) {
                        embed.addField(_class.subject, _class.time);
                    }
                }
            }
        }

        message.channel
            .send(embed)
            .then((msg) => msg.delete({ timeout: 30000 }));
    },
};
