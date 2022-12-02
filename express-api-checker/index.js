const express = require('express')
const ipToInt = require('./ip-to-int')
const ipToIntV2 = require('ip-to-int')
const path = require('path')
const fs = require('fs')
const { parse } = require('csv-parse')

const PORT = process.env.PORT || 3001

const app = express()
// app.set('trust proxy', true)

let csvData = [];
fs.createReadStream(path.join(__dirname, 'IP_ADRESSES.CSV'))
  .pipe(parse({ delimiter: ',' }))
  .on('data', function (csvrow) {
    if (csvrow.includes('-')) return
    csvData.push(csvrow);
  })
  .on('end', function () {
    //do something with csvData
    console.log('Data parsed!');
  });

app.get('/', function (req, res) {
  let ip = req.ip
  console.log(ip);
  const decimalIp = ipToInt('89.32.170.255').toString()
  // const decimalIp = ipToIntV2('89.32.170.255').toInt().toString()
  console.log(decimalIp);
  let foundLocation = csvData.find(el => el.includes(decimalIp))
  if (!foundLocation) return res.send('Cannot get your location')
  res.status(200).send(`Your location is ${foundLocation[3]}!`)

});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
})
