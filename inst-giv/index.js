import fs from 'fs'
import { existInAllFiles } from './existInAllFiles.js'
import { existInAtLeastTenFiles } from './existInAtLeastTenFiles.js'
import { uniqueValues } from './uniqueValues.js'

console.time('timer')
const data = []

for (let i = 0; i < 20; i++) {
  const array = fs.readFileSync(`./assets/out${i}.txt`, 'utf-8').split('\n')
  data.push(array)
}

const uniqs = uniqueValues(data)
console.log(uniqs);

const existInAll = existInAllFiles(data)
console.log(existInAll);

const existInAtLeastTen = existInAtLeastTenFiles(data)
console.log(existInAtLeastTen);