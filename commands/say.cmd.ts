import { TextChannel } from 'discord.js';
import { Command } from './command';
import { getIdFromMessage, isAdmin } from './util';

export const command: Command = {
    name: 'say',
    aliases: ['s'],
    description: 'Say',
    async execute(message, args) {
        if (!isAdmin(message.member)) {
            const content = 'You must be an admin to use this command';
            const responseMsg = await message.channel.send(content);

            responseMsg.delete({ timeout: 6000 });
            message.delete();
            return;
        }

        // Invalid format
        if (args.length < 2 || !getIdFromMessage(args[0])) {
            const content = '**Format:** .say <channel (mention/id)> <message>';
            const responseMsg = await message.channel.send(content);

            responseMsg.delete({ timeout: 6000 });
            message.delete({ timeout: 10000 });
            return;
        }

        // Convert mention to channel ID and validate it
        const channel = message.client.channels.cache.get(
            getIdFromMessage(args[0])
        );
        if (!channel) {
            const responseMsg = await message.channel.send(
                'That is not a valid channel ID'
            );

            responseMsg.delete({ timeout: 6000 });
            message.delete({ timeout: 10000 });
            return;
        }

        if (channel.type !== 'text') {
            const responseMsg = await message.channel.send(
                'That channel is not a text channel'
            );

            responseMsg.delete({ timeout: 6000 });
            message.delete({ timeout: 10000 });
            return;
        }

        (channel as TextChannel).send(args.slice(1).join(' '));
        message.delete();
    },
};
