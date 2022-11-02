import { urls } from "./urls.js";
import axios from 'axios';

//Defining counters
let isDoneTotal = 0
let isNotDoneTotal = 0

//Kостыльная штуковина
let requests = {}
urls.forEach((val, index) => {
  requests[`request${index + 1}`] = 0
})



for (let i = 0; i < urls.length; i++) {

  await axios.get(urls[i])
    .then(res => {
      requests[`request${i + 1}`]++
      console.log(`Url ${i + 1} - downloaded!`);
      searchIsDone(res.data, urls[i])
    })
    //Перезапросы
    .catch(err => {
      requests[`request${i + 1}`]++
      console.log(`Error! Sending request for Url ${' ' + (i + 1)} again...`);
      if (requests[`request${i + 1}`] < 3) {
        i--
      }
    })
}




function searchIsDone(item, url) {
  for (let key in item) {
    //Если обьект
    if (typeof item[key] === 'object' && !Array.isArray(item[key])) {
      searchIsDone(item[key], url)
    }
    //Eсли булевое значение
    if (key === 'isDone') {
      if (item[key]) {
        isDoneTotal++
      } else {
        isNotDoneTotal++
      }
      return console.log(`${url}: isDone - ${item[key]} `);
    }
  }
}


console.log(`\nTotal isDone: ${isDoneTotal}\nTotal isNotDone: ${isNotDoneTotal}`);