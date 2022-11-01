import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import fs from 'fs'
import Path from 'path'
import chalk from "chalk";



const token = '5626264132:AAFV4H9Z0RPrfBW_YyMH_RmG8okh62WRAOU'

const bot = new TelegramBot(token, { polling: true })

bot.onText(/^[a-zA-Z0-9_.-]*$/, async function (info) {
  if (info.text === 'photo') {
    bot.sendMessage(info.from.id, `Sending photo...`)
    const url = 'https://picsum.photos/200/300'
    const path = Path.resolve('./', 'buffer', 'img.jpeg')
    const writer = fs.createWriteStream(path)

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })


    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    }).then(() => {
      console.log(chalk.bgBlue(`Sending photo for ${info.from.first_name}`));
      bot.sendPhoto(info.from.id, 'C:/Users/tolik/Desktop/lambda-tasks/telegram-echo/buffer/img.jpeg', {}, {
        contentType: 'application/octet-stream'
      })
    })

  }
  console.log(`${info.from.first_name} says ${chalk.bgCyan(info.text)}\n`);
  bot.sendMessage(info.from.id, `You wrote '${info.text}'`)
})