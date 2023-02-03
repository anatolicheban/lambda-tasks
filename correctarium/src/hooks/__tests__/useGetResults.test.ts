import { variants } from "../../data/testData";
import { useGetResults } from "../useGetResults";

variants.forEach(({ input, result }, index) => {
  test(`test-${index + 1}`, () => {
    expect(useGetResults(input)).toStrictEqual(result);
  });
});
