import { TextChannel } from 'discord.js';
import { Command } from './command';
import { getIdFromMessage } from './util';

export const command: Command = {
    name: 'say',
    aliases: ['s'],
    description: 'Say',
    async execute(message, args) {
        // Allow only my account until I implement admin system
        if (message.author.id !== '757569065039429655') return;

        if (args.length < 2 || !getIdFromMessage(args[0])) {
            const content = '**Format:** .say <channel (mention/id)> <message>';
            const responseMsg = await message.channel.send(content);

            responseMsg.delete({ timeout: 6000 });
            message.delete({ timeout: 3000 });
        } else {
            // Convert mention to channel ID and send message
            const channel = message.client.channels.cache.get(
                getIdFromMessage(args[0])
            );

            if (channel.type === 'text') {
                (channel as TextChannel).send(args.slice(1).join(' '));
                message.delete();
            } else {
                const responseMsg = await message.channel.send(
                    'That channel is not a text channel'
                );

                responseMsg.delete({ timeout: 6000 });
            }
        }
    },
};
