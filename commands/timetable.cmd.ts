import { MessageEmbed } from 'discord.js';
import { Command } from './command';
import { todayAsString, isDay } from './util';
import { weeklySchedule } from '../data/schedule';

export const command: Command = {
    name: 'timetable',
    aliases: ['schedule', 'tt'],
    description: 'Timetable',
    async execute(message, args) {
        const embed = new MessageEmbed()
            // .setAuthor('College Assistant')
            .setDescription(
                `**Current Time:** ${new Date().toLocaleTimeString()}`
            ) // TODO: Show next class and ETA
            .setThumbnail('https://i.imgur.com/am7FRar.png')
            .setTimestamp()
            .setFooter(
                'jordan-git/college-discord-bot',
                'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            )
            .setColor('#3bbed9');

        if (args.length === 0) {
            // Add fields for today's classes
            for (const day of weeklySchedule) {
                if (day.day.toLowerCase() === todayAsString().toLowerCase()) {
                    embed.setTitle(`\tTimetable\t\t[${day.day}]`);
                    for (const _class of day.schedule) {
                        embed.addField(
                            _class.subject.name,
                            _class.time +
                                (_class.subject.moodle
                                    ? `\n[Moodle](${_class.subject.moodle})`
                                    : '')
                        );
                    }
                }
            }

            const responseMsg = await message.channel.send(embed);

            responseMsg.delete({ timeout: 30000 });
            message.delete();
            return {
                success: true,
                info: `Sent ${todayAsString()}'s timetable`,
            };
        }

        if (args.length === 1) {
            let inSchedule = false;
            let dayString = '';

            // Add details for entered day if it exist
            for (const day of weeklySchedule) {
                if (day.day.toLowerCase() === args[0].toLowerCase()) {
                    inSchedule = true;
                    dayString = day.day;

                    embed.setTitle(`\tTimetable\t\t[${day.day}]`);
                    for (const _class of day.schedule) {
                        embed.addField(_class.subject, _class.time);
                    }
                }
            }

            // If not in schedule but is a week day
            if (!inSchedule && isDay(args[0])) {
                const content = 'You have no classes on that day';
                const responseMsg = await message.channel.send(content);

                responseMsg.delete({ timeout: 6000 });
                message.delete();
                return {
                    success: true,
                    info: 'No classes that day',
                };
            }
            if (!inSchedule) {
                const content = 'Invalid day of the week';
                const responseMsg = await message.channel.send(content);

                responseMsg.delete({ timeout: 6000 });
                message.delete({ timeout: 6000 });
                return {
                    success: true,
                    info: 'Invalid day',
                };
            }
            const responseMsg = await message.channel.send(embed);

            responseMsg.delete({ timeout: 30000 });
            message.delete();
            return {
                success: true,
                info: `Sent ${dayString}'s timetable`,
            };
        }

        const content = '**Format:** .timetable / .timetable <day>';
        const responseMsg = await message.channel.send(content);

        responseMsg.delete({ timeout: 6000 });
        message.delete({ timeout: 3000 });
        return {
            success: true,
            info: 'Invalid format',
        };
    },
};
