//Defining our custom array interface
interface Array<T> {
  /**
   * Multiplies each number in the array by the specified factor
   * @param this Array of numbers
   * @param factor The number by which all numbers in the array are multiplied. If it is not specified, it defaults to 10
   * @returns Array of multiplied numbers
   */
  multiply(): number[];
  /**
   * Multiplies each number in the array by the specified factor
   * @param this Array of numbers
   * @param factor The number by which all numbers in the array are multiplied. If it is not specified, it defaults to 10
   * @returns Array of multiplied numbers
   */
  multiply(factor: number): number[];
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param cb Function, where you must spesify the test
   * @returns true or false, in dependence what result test gives
   */
  all: (cb: (item: T) => boolean) => boolean;
  /**
   * Determines whether at list one of an array satisfy the specified test.
   * @param cb Function, where you must spesify the test
   * @returns true or false, in dependence what result test gives
   */
  any: (cb: (item: T) => boolean) => boolean;
}

//Defining method multiply
Array.prototype.multiply = function (this: number[], factor?: number) {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i] * (factor || 10);
  }

  return this;
};

//Multiply test
const numsArr = [1, 3, 4, 5];
// console.log(numsArr.multiply());

//All
Array.prototype.all = function <T>(this: T[], cb: (item: T) => boolean): boolean {
  for (let i = 0; i < this.length; i++) {
    if (!cb(this[i])) return false;
  }

  return true;
};

//All test
const arr = ["56", "34657", "325"];
// console.log(arr.all((item) => item.length > 1));

//Any
Array.prototype.any = function <T>(this: T[], cb: (item: T) => boolean): boolean {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) return true;
  }
  return false;
};

//Any Test
const array = ["36", "54657", "325"];
console.log(array.any((item) => item[0] === "5"));
