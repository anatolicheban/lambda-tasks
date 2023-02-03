import { Input, Output } from "../models/models";

export const variants: { input: Input; result: Output }[] = [
  {
    input: { lang: "EN", chars: 1000, mimetype: "doc", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 120, deadline: "01.02.2023, 14:00", time: 4 },
  },
  {
    input: { lang: "RU", chars: 1000, mimetype: "doc", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 50, deadline: "01.02.2023, 12:00", time: 2 },
  },
  {
    input: { lang: "RU", chars: 800, mimetype: "doc", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 50, deadline: "01.02.2023, 12:00", time: 2 },
  },
  {
    input: { lang: "EN", chars: 800, mimetype: "other", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 120, deadline: "01.02.2023, 14:00", time: 4 },
  },
  {
    input: { lang: "RU", chars: 9800, mimetype: "doc", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 490, deadline: "01.02.2023, 18:00", time: 8 },
  },
  {
    input: { lang: "RU", chars: 9800, mimetype: "other", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 588, deadline: "02.02.2023, 11:00", time: 10 },
  },
  {
    input: { lang: "EN", chars: 9800, mimetype: "docx", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 1176, deadline: "06.02.2023, 13:00", time: 30 },
  },
  {
    input: { lang: "EN", chars: 100000, mimetype: "docx", date: "2023-01-31T19:54:30.822Z" },
    result: { price: 12000, deadline: "20.03.2023, 14:00", time: 301 },
  },
];
