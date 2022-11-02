import { writeFileSync, readFileSync } from 'fs'

const data = JSON.parse(readFileSync('data.json', 'utf-8'))

let result = []

data.forEach(item => {
  if (!result.find(el => el.userId === item.user._id)) {
    result.push({
      userId: item.user._id,
      name: item.user.name,
      weekendDates: [{ startDate: item.startDate, endDate: item.endDate }]
    })
  } else {
    result.find(el => el.userId === item.user._id)
      .weekendDates.push({ startDate: item.startDate, endDate: item.endDate })
  }
})

writeFileSync('result.json', JSON.stringify(result))