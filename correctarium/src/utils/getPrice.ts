import { Input } from "../models/models";

export function getPrice(input: Input): number {
  let price = 0;

  //Price
  let charPrice = input.lang === "RU" || input.lang === "UA" ? 0.05 : 0.12;
  price += charPrice * input.chars;

  //Mimetype check
  if (input.mimetype === "other") {
    price *= 1.2;
  }

  if (price < 50 && (input.lang === "RU" || input.lang === "UA")) {
    price = 50;
  } else if (price < 120 && input.lang === "EN") {
    price = 120;
  }

  return +price.toFixed(2);
}
