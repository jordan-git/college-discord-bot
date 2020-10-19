import { Command } from './command';

export const command: Command = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        message.channel.send('Pong.').then((msg) => {
            msg.delete({ timeout: 6000 });
            message.delete({ timeout: 6000 });
        });
    },
};
