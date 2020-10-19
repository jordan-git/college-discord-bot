import { TextChannel } from 'discord.js';
import { Command } from './command';
import {
    weeklySchedule,
    todayAsString,
    isDay,
    getStartHour,
    getIdFromMessage,
} from './util';

export const command: Command = {
    name: 'announce',
    aliases: ['a'],
    description: 'Announce',
    async execute(message, args) {
        if (args.length < 2) {
            const content = '**Format:** .announce <channel> <message>';
            const responseMsg = await message.channel.send(content);

            responseMsg.delete({ timeout: 6000 });
            message.delete({ timeout: 3000 });
        }

        // Convert mention to channel ID and send message
        if (getIdFromMessage(args[0])) {
            const channel = message.client.channels.cache.get(
                getIdFromMessage(args[0])
            );

            if (channel.type === 'text')
                (channel as TextChannel).send(args.slice(1).join(' '));
        }
    },
};
