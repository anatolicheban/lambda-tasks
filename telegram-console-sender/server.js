import TelegramBot from 'node-telegram-bot-api'
import { writeFileSync, readFileSync } from "fs";
import lodash from 'lodash'

//Получаем простенькую бд
export const users = JSON.parse(readFileSync('users.txt', 'utf-8'))

// Подключаемся к боту
export const token = '5684482539:AAG0L1waRyb3URkWgyc051MLRVdPcPigV3A'
const bot = new TelegramBot(token, { polling: true })

//Вносим пользователя в бд при команде /start
bot.onText(/\/start/, (msg) => {
  const user = {
    username: msg.chat.username,
    id: msg.chat.id,
  }
  //Проверяем есть ли такой пользователь в бд
  let isInDatabase = users.find(item => lodash.isEqual(item, user))
  if (!isInDatabase) {
    users.push(user)
    //Перезаписываем бд
    writeFileSync('users.txt', JSON.stringify(users))
    bot.sendMessage(msg.chat.id, 'Ok, wait for the messages');
  }
});
