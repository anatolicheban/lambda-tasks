import { Console } from 'console'
import fs from 'fs'
import { existInAllFiles } from './existInAllFiles.js'
import { existInAtLeastTenFiles } from './existInAtLeastTenFiles.js'
import { uniqueValues } from './uniqueValues.js'

const data = []

for (let i = 0; i < 20; i++) {
  const array = fs.readFileSync(`./assets/out${i}.txt`, 'utf-8').split('\n')
  data.push(array)
}

console.time('unique')
const uniqs = uniqueValues(data)
console.timeEnd('unique')
console.log(uniqs);

console.time('existsAll')
const existInAll = existInAllFiles(data)
console.timeEnd('existsAll')
console.log(existInAll);

console.time('exists10')
const existInAtLeastTen = existInAtLeastTenFiles(data)
console.timeEnd('exists10')
console.log(existInAtLeastTen);