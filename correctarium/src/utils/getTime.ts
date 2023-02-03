import { Input } from "../models/models";

export function getTime(input: Input) {
  let time = 0.5;
  let speed = input.lang === "RU" || input.lang === "UA" ? 1333 : 333;
  time += input.chars / speed;

  //Mimetype check
  if (input.mimetype === "other") {
    time *= 1.2;
  }

  return Math.ceil(time);
}
