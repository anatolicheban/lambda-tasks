import inquirer from 'inquirer';
import { readFileSync, writeFileSync } from 'fs'

const startJson = readFileSync('db.txt', 'utf-8')
const database = JSON.parse(startJson)
console.log(database);


//Запускаем приложение
askUsername()

function askUsername() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter your username (press Enter to search)',
      name: 'name',
    },
  ]).then(answers => {
    if (answers.name === '') {
      // Спрашиваем ДА или НЕТ для поиска в БД
      return askforSearching()
    }
    return askMoreInfo(answers.name)
  })
    .catch(err => console.log(err))
}


function askMoreInfo(name) {
  // Новый обьект для того чтобы перезаписать данные в удобном порядке, как в нашей БД
  let result = {}

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Enter your gender',
        name: 'gender',
        choices: [
          'male', 'female'
        ]
      },
      {
        type: 'input',
        message: 'Enter your age',
        name: 'age',
        validate(age) {
          if (isNaN(+age) || +age === null || age === '' || age < 0 || age > 120) return 'Enter correct age'
          return true
        }
      },
    ]).then((answers) => {
      result.name = name
      result.gender = answers.gender
      //дополнительно превращаем строку инпута в число
      result.age = +answers.age
      database.push(result)
      writeFileSync('db.txt', JSON.stringify(database))
      console.log(database);
      //Новый цикл добавления пользователя
      askUsername()
    }).catch((err) => console.log(err))
}

function search() {

  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter keyword:',
      name: 'keyword',
      validate(name) {
        if (!name || name.length > 30) return 'Incorrect keyword!'
        if (name.includes(' ')) return 'Enter your keyword without spaces!'
        return true
      }
    }
  ]).then(answer => {
    let result = []
    database.forEach(el => {
      //Поиск в строках с переводом в нижний регистр всех букв
      if (el.name.toLowerCase().indexOf(answer.keyword.toLowerCase()) !== -1) {
        result.push(el)
      }
    })
    // Пустой массив - нет результатов поиска
    if (result.length === 0) return console.log('No results');
    //Вывод непустого массива и завершение работы
    console.log('Results\n', result);
  })

}

function askforSearching() {
  inquirer.prompt([
    {
      type: 'confirm',
      default: true,
      message: 'Do you want to search for users in DB?',
      name: 'isSearching'
    },
  ]).then(answers => {
    if (answers.isSearching) return search()
    // Завершение работы
    console.log('Good bye!');
  })
}