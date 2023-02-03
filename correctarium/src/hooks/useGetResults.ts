import { Input, Output } from "../models/models";
import { getDeadline } from "../utils/getDeadline";
import { getPrice } from "../utils/getPrice";
import { getTime } from "../utils/getTime";

export const useGetResults = (input: Input): Output => {
  let result: Output = {
    price: 0,
    time: 0.5,
    deadline: "",
  };
  //Priceo
  result.price = getPrice(input);
  //Deadline Time
  const time = getTime(input);
  result.time = time;
  //Deadline Date
  result.deadline = getDeadline(time, input.date);

  return result;
};
