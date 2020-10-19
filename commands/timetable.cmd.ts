import { MessageEmbed } from 'discord.js';
import { Command } from './command';
import { weeklySchedule, todayAsString, isDay, getStartHour } from './util';

export const command: Command = {
    name: 'timetable',
    aliases: ['schedule', 'tt'],
    description: 'Timetable',
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Timetable')
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
                if (day.name.toLowerCase() === todayAsString().toLowerCase()) {
                    embed.setTitle(`Timetable\t\t[${day.name}]`);
                    for (const _class of day.schedule) {
                        embed.addField(
                            _class.subject,
                            _class.time +
                                (_class.moodle
                                    ? `\n[Moodle](${_class.moodle})`
                                    : '')
                        );
                    }
                }
            }

            const responseMsg = await message.channel.send(embed);

            responseMsg.delete({ timeout: 30000 });
            message.delete();
            return;
        }

        if (args.length === 1) {
            let inSchedule = false;

            // Add details for entered day if it exist
            for (const day of weeklySchedule) {
                if (day.name.toLowerCase() === args[0].toLowerCase()) {
                    inSchedule = true;

                    embed.setTitle(`Timetable\t\t[${day.name}]`);
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
            } else if (!inSchedule) {
                const content = 'Invalid day of the week';
                const responseMsg = await message.channel.send(content);

                responseMsg.delete({ timeout: 6000 });
                message.delete({ timeout: 6000 });
            } else {
                const responseMsg = await message.channel.send(embed);

                responseMsg.delete({ timeout: 30000 });
                message.delete();
            }

            return;
        }

        const content = '**Format:** .timetable / .timetable <day>';
        const responseMsg = await message.channel.send(content);

        responseMsg.delete({ timeout: 6000 });
        message.delete({ timeout: 3000 });
    },
};
