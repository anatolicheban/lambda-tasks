export function uniqueValues(arr) {

  let unique = new Set()

  arr.forEach((item) => {
    item.forEach(element => {
      unique.add(element)
    })
  })

  return unique.size
}