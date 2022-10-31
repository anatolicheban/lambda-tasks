function sortWords(array) {
  let words = [];
  array.forEach(el => {
    if (!+el) {
      words.push(el)
    }
  })
  return words.sort().join(' ')
}

function sortNums(array) {
  let nums = []
  array.forEach(el => {
    if (+el) {
      nums.push(el)
    }
  })
  return nums.sort().join(' ')
}


function reverseSortNums(array) {
  let nums = []
  array.forEach(el => {
    if (+el) {
      nums.push(el)
    }
  })
  return nums.sort().reverse().join(' ')
}

function sortWordsByLength(array) {
  let words = [];
  array.forEach(el => {
    if (!+el) {
      words.push(el)
    }
  })
  return words.sort((a, b) => { return a.length - b.length }).join(' ')
}

function showUniqueWords(array) {
  let words = []
  array.forEach(el => {
    if (!+el && !words.includes(el)) {
      words.push(el)
    }
  })
  return words.join(' ')
}

function showUniqueItems(array) {
  let items = []
  array.forEach(el => {
    if (!items.includes(el)) {
      items.push(el)
    }
  })
  return items.join(' ')
}

const interactiveSort = () => {
  let data = prompt('Введите входные данные (числа, строки) через пробел, минимум 5 значений');
  if (data === null) {
    return alert('Вы вышли из приложения')
  } else if (data === '') {
    return alert('Вы не ввели входные данные')
  }
  console.log(data);

  let dataArr = data.split(' ')


  let operation = prompt(`Выберите операцию (введите соответствующее списку число): 
  \n1. Отсортировать слова по алфавиту
  \n2. Отобразить числа от меньшего к большему
  \n3. Отобразить числа от большего к меньшему
  \n4. Отобразить слова в порядке возрастания по количеству букв в слове
  \n5. Показать только уникальные слова
  \n6. Показать только уникальные значения из всего введённого пользователем набора слов и чисел.
  \nexit - выйти из программы`)

  if (operation === null) {
    return alert('Вы вышли из приложения')
  } else if (operation === '') {
    return alert('Вы не ввели операцию!')
  } else if (operation == 'exit') {
    return alert('До встречи!')
  } else if (operation === '1') {
    alert(sortWords(dataArr))
  } else if (operation === '2') {
    alert(sortNums(dataArr))
  } else if (operation === '3') {
    alert(reverseSortNums(dataArr))
  } else if (operation === '4') {
    alert(sortWordsByLength(dataArr))
  } else if (operation === '5') {
    alert(showUniqueWords(dataArr))
  } else if (operation === '6') {
    alert(showUniqueItems(dataArr))
  } else {
    return alert('Вы ввели некорректную операцию!')
  }

}

interactiveSort()