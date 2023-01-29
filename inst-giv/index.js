import fs from 'fs'

const files = [
  'out0.txt',
  'out1.txt',
  'out2.txt',
  'out3.txt',
  'out4.txt',
  'out5.txt',
  'out6.txt',
  'out7.txt',
  'out8.txt',
  'out9.txt',
  'out10.txt',
  'out11.txt',
  'out12.txt',
  'out13.txt',
  'out14.txt',
  'out15.txt',
  'out16.txt',
  'out17.txt',
  'out18.txt',
  'out19.txt',
]

const uniqueValues = () => {

  let promises = []

  let uniqs = []

  for (let i = 0; i < files.length; i++) {
    promises.push(new Promise(async (resolve, reject) => {
      fs.readFile(`./assets/${files[i]}`, 'utf-8', (err, data) => {
        console.log(`Checking for file ${i}`);
        data.split('\n').forEach(elem => {
          if (!uniqs.includes(elem)) {
            uniqs.push(elem)
          }
        })
      })
    }))
  }

  return Promise.all(promises)
    .then(() => { console.log(uniqs.length); })
}

uniqueValues()