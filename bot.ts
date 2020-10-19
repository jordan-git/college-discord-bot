import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';

import { Command } from './commands/command';

// Store .env variables in process.env
dotenv.config();

// TODO: Add react-role system

export class Bot {
    private commands: Collection<string, Command>;
    private client: Client;

    constructor() {
        this.start();
    }

    private start() {
        console.log('Starting bot..');

        this.client = new Client();
        this.commands = new Collection();

        // Get .cmd.ts file names only
        const commandFiles = readdirSync('./commands').filter((file) =>
            file.endsWith('.cmd.ts')
        );

        // Import each command found and store in client.commands
        for (const file of commandFiles) {
            const { command } = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }

        this.handleReady();

        this.handleMessage();

        this.client.login(process.env.DISCORD_TOKEN);
    }

    private handleReady() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}`);
            this.client.user.setPresence({
                activity: {
                    name: 'your commands',
                    type: 'LISTENING',
                },
                status: 'online',
            });
            // TODO: Load react-role messages
        });
    }
    private handleMessage() {
        this.client.on('message', async (message) => {
            if (
                !message.content.startsWith(process.env.PREFIX) ||
                message.author.bot
            )
                return;

            // Get command name and args
            const args = message.content
                .slice(process.env.PREFIX.length)
                .trim()
                .split(' ');
            const commandName = args.shift().toLowerCase();

            // Check if command exists in client.commands (alias support)
            const command =
                this.commands.get(commandName) ||
                this.commands.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                );

            if (!command) return;

            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
            }
        });
    }
}
