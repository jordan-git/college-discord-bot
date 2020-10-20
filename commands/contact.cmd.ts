import { MessageEmbed } from 'discord.js';
import { Command } from './command';

export const command: Command = {
    name: 'contact',
    aliases: ['c', 'info', 'email'],
    description: 'Contact',
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Contact')
            .setDescription(
                'Look below to find the email address for all your lecturers'
            )
            .setThumbnail('https://i.imgur.com/am7FRar.png')
            .setTimestamp()
            .setFooter(
                'jordan-git/college-discord-bot',
                'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            )
            .setColor('red');

        // for (const iterator of object) {

        // }

        const responseMsg = await message.channel.send(embed);

        responseMsg.delete({ timeout: 10000 });
        message.delete();
    },
};
