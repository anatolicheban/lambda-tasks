import { addDays, addHours, setHours, subDays } from "date-fns";

export function getDeadline(time: number, currentDate: string): string {
  let dateToComplete = new Date(currentDate);
  console.log("start", dateToComplete);

  if (dateToComplete.getHours() < 10) {
    dateToComplete = setHours(dateToComplete, 10);
  }

  if (dateToComplete.getHours() > 19) {
    dateToComplete = setHours(addDays(dateToComplete, 1), 10);
  }

  if (dateToComplete.getDay() === 6) {
    dateToComplete = addDays(dateToComplete, 2);
  }

  if (dateToComplete.getDay() === 0) {
    dateToComplete = addDays(dateToComplete, 1);
  }
  console.log("First validation", dateToComplete);

  let timeToComplete = time;

  while (timeToComplete >= 9) {
    dateToComplete = addDays(dateToComplete, 1);
    if (dateToComplete.getDay() === 6) {
      dateToComplete = addDays(dateToComplete, 2);
    }

    // if (dateToComplete.getDay() === 0) {
    //   dateToComplete = addDays(dateToComplete, 1);
    // }
    timeToComplete -= 9;
  }

  console.log("After cycle", dateToComplete);

  if (dateToComplete.getHours() + timeToComplete > 19) {
    timeToComplete -= 19 - dateToComplete.getHours();
    dateToComplete = setHours(addDays(dateToComplete, 1), 10);
  } else {
    dateToComplete = addHours(dateToComplete, timeToComplete);
  }
  //УЖАС... Лишь бы потом обьяснить
  if (dateToComplete.getDay() === 6) {
    dateToComplete = addDays(dateToComplete, 2);
  }

  console.log("After other hours", dateToComplete);

  if (dateToComplete.getHours() === 10) {
    if (subDays(dateToComplete, 1).getDay() === 0) {
      dateToComplete = addHours(dateToComplete, 1);
    } else {
      dateToComplete = setHours(subDays(dateToComplete, 1), 19);
    }
  }
  console.log(dateToComplete);

  return `${dateToComplete.toLocaleDateString() + ", " + dateToComplete.getHours() + ":00"}`;
}
