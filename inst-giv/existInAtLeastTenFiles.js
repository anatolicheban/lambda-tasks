export function existInAtLeastTenFiles(arr) {
  const valuesCounter = new Map();
  arr.forEach(item => {
    const set = new Set()

    item.forEach(value => {


      if (valuesCounter.has(value) && !set.has(value)) {
        set.add(value)
        valuesCounter.set(value, valuesCounter.get(value) + 1);
      } else if (!set.has(value)) {
        set.add(value)
        valuesCounter.set(value, 1);
      }
    });
  });

  const repeats = [];

  for (const [value, count] of valuesCounter.entries()) {
    if (count >= 10) {
      repeats.push(value);
    }
  }

  return repeats.length
}
