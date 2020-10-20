import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';
import * as winston from 'winston';

import { Command } from './commands/command';
import { todayAsString } from './commands/util';

// Store .env variables in process.env
dotenv.config();

// TODO: Add react-role system

export class Bot {
    private client: Client;
    private logger: winston.Logger;

    private commands: Collection<string, Command>;

    constructor() {
        this.start();
    }

    private start() {
        this.client = new Client();
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.logs' }),
            ],
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(
                    (log) =>
                        `[${log.timestamp}] [${log.level.toUpperCase()}] - ${
                            log.message
                        }`
                )
            ),
        });

        this.commands = new Collection();

        this.logger.log('info', 'Starting bot');

        // Get .cmd.ts file names only
        const commandFiles = readdirSync('./commands').filter((file) =>
            file.endsWith('.cmd.ts')
        );

        // Import each command found and store in client.commands
        for (const file of commandFiles) {
            const { command } = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }

        this.client.on('debug', (m) => this.logger.log('debug', m));
        this.client.on('warn', (m) => this.logger.log('warn', m));
        this.client.on('error', (m) => this.logger.log('error', m));

        process.on('uncaughtException', (error) =>
            this.logger.log('error', error)
        );

        this.handleReady();

        this.handleMessage();

        this.client.login(process.env.DISCORD_TOKEN);
    }

    private handleReady() {
        this.client.on('ready', () => {
            this.logger.log('info', `Logged in as ${this.client.user.tag}`);

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

            this.logger.log(
                'info',
                `Executing command '${commandName}' with ${
                    args.length ? `args [${args.join(', ')}]` : 'no args'
                }`
            );

            // Check if command exists in client.commands (alias support)
            const command =
                this.commands.get(commandName) ||
                this.commands.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                );

            if (!command) return;

            try {
                const execute = await command.execute(message, args);
                if (execute.success === true) {
                    execute.info
                        ? this.logger.log(
                              'info',
                              `Executed command '${commandName}': ${execute.info}`
                          )
                        : this.logger.log(
                              'info',
                              `Executed command '${commandName}' successfully`
                          );
                } else
                    execute.info
                        ? this.logger.log(
                              'info',
                              `Error executing command  '${commandName}': ${execute.info}`
                          )
                        : this.logger.log(
                              'info',
                              `Error executing command '${commandName}'`
                          );
            } catch (error) {
                this.logger.log('error', error);
                console.log(error);
            }
        });
    }
}
