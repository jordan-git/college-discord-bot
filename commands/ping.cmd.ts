import { Command } from './command';

export const command: Command = {
    name: 'ping',
    description: 'Ping!',
    async execute(message) {
        const responseMsg = await message.channel.send('Pong.');

        responseMsg.delete({ timeout: 6000 });
        message.delete({ timeout: 6000 });
    },
};
