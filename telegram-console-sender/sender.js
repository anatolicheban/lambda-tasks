import { users, token } from './server.js';
import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';
const program = new Command();


const bot = new TelegramBot(token, { polling: false })


program
  .name('sender')
  .description('CLI to send meessages and photos from telegram bot')
  .version('0.0.1');

program.command('message')
  .description('Sends a text message to users')
  .argument('<string>')
  .action((msg) => {
    users.forEach(user => {
      bot.sendMessage(user.id, msg)
    })
  });

program.command('photo')
  .description('Sends a photo to users')
  .argument('<path>')
  .action((msg) => {
    users.forEach(user => {
      bot.sendPhoto(user.id, msg)
    })
  });


program.parse();