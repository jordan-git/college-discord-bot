import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';

import { Command } from './commands/command';

// Store .env variables in process.env
dotenv.config();

interface CustomClient extends Client {
    commands?: Collection<string, Command>;
}

export class Bot {
    private client: CustomClient;

    constructor() {
        this.start();
    }

    private start() {
        console.log('Starting bot...');
        this.client = new Client();
        this.client.commands = new Collection();

        const commandFiles = readdirSync('./commands').filter((file) =>
            file.endsWith('.cmd.ts')
        );

        for (const file of commandFiles) {
            const { command } = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
        }

        this.client.on('ready', () => {
            console.log('Started...');
        });

        this.client.on('message', async (message) => {
            if (
                !message.content.startsWith(process.env.PREFIX) ||
                message.author.bot
            )
                return;

            const args = message.content
                .slice(process.env.PREFIX.length)
                .trim()
                .split(' ');
            const commandName = args.shift().toLowerCase();

            if (!this.client.commands.has(commandName)) return;
            const command = this.client.commands.get(commandName);

            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
            }
        });

        this.client.login(process.env.DISCORD_TOKEN);
    }
}

const b = new Bot();
