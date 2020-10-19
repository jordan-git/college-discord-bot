import { Command } from './command';

export const command: Command = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
