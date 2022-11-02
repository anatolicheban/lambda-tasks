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

console.log(`\nTotal isDone: ${isDoneTotal}\nTotal isNotDone: ${isNotDoneTotal}`);


function searchIsDone(item, url) {
  for (let key in item) {
    //Если массив
    if (Array.isArray(item[key])) {
      searchInArr(item[key], url)
    }
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

function searchInArr(arr, url) {
  for (let i = 0; i < arr.length; i++) {
    //Array
    if (Array.isArray(arr[i])) {
      searchInArr(arr[i], url)
    }
    //Object
    if (typeof arr[i] === 'object' && !Array.isArray(arr[i])) {
      searchIsDone(arr[i], url)
    }
  }
}

