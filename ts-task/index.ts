//Defining our custom array interface
interface Array<T> {
  /**
   * Multiplies each number in the array by the specified factor (default 10)
   * @param this Array of numbers
   * @param factor optional: The number by which all numbers in the array are multiplied. If it is not specified, it defaults to 10
   * @returns Array of multiplied numbers
   */
  multiply(this: number[]): number[];
  /**
   * Multiplies each number in the array by the specified factor
   * @param this Array of numbers
   * @param factor optional: The number by which all numbers in the array are multiplied. If it is not specified, it defaults to 10
   * @returns Array of multiplied numbers
   */
  multiply(this: number[], factor: number): number[];
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param cb Function, where you must spesify the test
   * @returns true or false, in dependence what result test gives
   */
  all(cb: (item: T) => boolean): boolean;
  /**
   * Determines if an array has at least one element
   * @returns true if sequence has at least one element.
   */
  any(): boolean;
  /**
   * Transforms elements of array and turn it to a Map
   * @param cb Transform function
   * @returns Map containing key-value pairs provided by transform function applied to elements of the given sequence.
   */
  associateBy<S>(cb: (item: T) => S): Map<T, S>;
  /**
   * Calculates the average value of array elements
   * @returns Number - average value of array elements
   */
  average(this: number[]): number;
  /**
   * Splits an array into an array of lists (chunks) each not exceeding the given size (default 3).
    @param chunkSize Size of 'chunk' (optional)
    @returns Array of chunks
   */
  chunked(): T[][];
  /**
   * Splits an array into an array of lists (chunks) each not exceeding the given size (default 3).
    @param chunkSize optional: Size of chunk
    @returns Array of chunks
   */
  chunked(chunkSize: number): T[][];
  /**
   * Transforms array to array with unique keys selected by selector function
   * @param cb Selector function
   * @returns An array containing only elements from the given array having distinct keys returned by the given selector function.
   */
  distinctBy(cb: (item: T) => boolean): T[];
  /**
   * Filters an array with given predicate
   * @param cb Predicate function
   * @returns An array containing only elements matching the given predicate.
   */
  myFilter(cb: (item: T) => boolean): T[];
  /**
   * Filters an array with given predicate and index
   * @param cb Predicate function
   * @returns An array containing only elements matching the given predicate.
   */
  filterIndexed(cb: (index: number, item: T) => boolean): T[];
  /**
   * Filters an array with given predicate
   * @param cb Predicate func
   * @returns Returns a sequence containing all elements not matching the given predicate.
   */
  filterNot(cb: (item: T) => boolean): T[];
  /**
   * Finds element from array what matches the predicate
   * @param cb Predicate func
   * @returns The first element matching the given predicate, or null if no such element was found.
   */
  myFind(cb: (item: T) => boolean): T | null;
  /**
   * Finds last element from array what matches the predicate
   * @param cb Predicate func
   * @returns Last element matching the given predicate, or null if no such element was found.
   */
  findLast(cb: (item: T) => boolean): T | null;
  /**
   * "Flats" an array
   * @returns An array of all elements from all arrays in this array.
   */
  flatten(): T[];
  /**
   * Accumulates value starting with initial value and applying operation from left to right to current accumulator value and each element.
   * @param cb Accumulator func
   * @param initVal Initial value
   */
  fold<S>(cb: (item: T, currentValue: S) => S, initVal: S): S;
  /**
   * Transforms an array with transform function and finds largest value of transformed array
   * @param cb Transform func
   * @param this Array of numbers
   * @returns The first element yielding the largest value of the given function.
   */
  maxBy(this: number[], cb: (item: number) => number): number | null;
  /**
   * Transforms an array with transform function and finds min value of transformed array
   * @param cb Transform func
   * @param this Array of numbers
   * @returns The first element yielding the min value of the given function.
   */
  minBy(this: number[], cb: (item: number) => number): number | null;
  /**
   * Counts value with given key in object array
   * @param this Array of objects
   * @param keySelector Function what selects given key value to count
   * @returns Number - total count
   */
  count(this: object[], keySelector: (item: T) => number): number;
  groupBy<S extends object>(this: object[], keySelector: (item: T) => keyof T | string): S;
}

//Defining method multiply
Array.prototype.multiply = function (this: number[], factor?: number): number[] {
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
  for (let element of this) {
    if (!cb(element)) return false;
  }

  return true;
};

//All test
const arr = ["56", "34657", "325"];
// console.log(arr.all((item) => item.length > 1));

//Any - неразбериха в условии
Array.prototype.any = function <T>(this: T[]): boolean {
  return Boolean(this.length);
};

//Any Test
const array = ["36", "54657", "325"];
// console.log(array.any());

//AssociateBy - разные обьяснения в тз и на сайте
Array.prototype.associateBy = function <T, S = T>(this: T[], cb: (item: T) => S): Map<T, S> {
  const map: Map<T, S> = new Map();

  for (let element of this) {
    map.set(element, cb(element));
  }

  return map;
};

//AssociateBy Test
const nums = [3, 4, 5];
// console.log(nums.associateBy<{ str: string }>((item) => ({ str: item.toString() })));

Array.prototype.average = function (this: number[]): number {
  let result = 0;
  for (let item of this) {
    result += item;
  }
  return result / this.length;
};

//Test average
const avg = [3, 5, 7];
// console.log(avg.average());

//Chunked
Array.prototype.chunked = function <T>(this: T[], chunkSize?: number): T[][] {
  chunkSize = chunkSize || 3;

  const chunkedArr: T[][] = [];
  let chunk: T[] = [];
  let countChunks = 0;

  for (let i = 0; i < this.length; i += chunkSize) {
    for (let j = 0; j < chunkSize; j++) {
      if (!this[i + j]) break;
      chunk[j] = this[i + j];
    }
    chunkedArr[countChunks] = chunk;
    countChunks++;
    chunk = [];
  }

  return chunkedArr;
};

//Test chunked
// console.log([2, 3, 3, 4, 5].chunked(2));

//DistinctBy
Array.prototype.distinctBy = function <T>(this: T[], cb: (item: T) => boolean): T[] {
  const result: T[] = [];
  let counter = 0;
  main: for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      for (let j = 0; j < result.length; j++) {
        if (result[j] === this[i]) continue main;
      }
      result[counter] = this[i];
      counter++;
    }
  }

  return result;
};

//DistinctBy Test
// console.log([3, 3, 4, 4, 2, 3, 1, 2, -1, 0, 0, 3, 0, 1, 5, 6].distinctBy((item) => item < 4));

//MyFilter
Array.prototype.myFilter = function <T>(this: T[], cb: (item: T) => boolean): T[] {
  const result: T[] = [];
  let counter = 0;
  for (let element of this) {
    if (cb(element)) {
      result[counter] = element;
      counter++;
    }
  }
  return result;
};

//Test
// console.log([3, 4, 5, 5, 6, 7].myFilter((item) => item > 4));

//FilterIndexed
Array.prototype.filterIndexed = function <T>(
  this: T[],
  cb: (index: number, item: T) => boolean
): T[] {
  const result: T[] = [];
  let counter = 0;
  for (let i = 0; i < this.length; i++) {
    if (cb(i, this[i])) {
      result[counter] = this[i];
      counter++;
    }
  }
  return result;
};

//Test
// console.log([3, 4, 0, 2, 5, 1, 8, 10, 11].filterIndexed((index, item) => item > index));

//FilterNot
Array.prototype.filterNot = function <T>(this: T[], cb: (item: T) => boolean): T[] {
  const result: T[] = [];
  let counter = 0;
  for (let elem of this) {
    if (!cb(elem)) {
      result[counter] = elem;
      counter++;
    }
  }
  return result;
};

//Test
// console.log([3, 4, 5, 6, 7, 8, 10, 11, 12].filterNot((item) => item > 7));

Array.prototype.myFind = function <T>(this: T[], cb: (item: T) => boolean): T | null {
  for (let elem of this) {
    if (cb(elem)) return elem;
  }
  return null;
};

//Test
// console.log([4, 5, 6, 7, 9].myFind((item) => item === 3 + 5));

Array.prototype.findLast = function <T>(this: T[], cb: (item: T) => boolean): T | null {
  let result: T | null = null;
  for (let elem of this) {
    if (cb(elem)) result = elem;
  }
  return result;
};

//Test
// console.log(["23", "1244", "124"].findLast((item) => item.length > 2));

Array.prototype.flatten = function <T>(this: T[]): any[] {
  let result: any[] = [];
  let counter = 0;

  const flatter = (item: T) => {
    if (typeof item === "object" && !Array.isArray(item)) return;
    if (Array.isArray(item)) {
      for (let el of item) {
        flatter(el);
      }
      return;
    }
    result[counter] = item;
    counter++;
  };
  for (let elem of this) {
    flatter(elem);
  }
  return result;
};

//Test
// console.log([3, 4, 5, [6, 7, 8, [9, 10], 11], 12, [13], { str: "2" }].flatten());

//Fold
Array.prototype.fold = function <T, S = T>(
  this: T[],
  cb: (item: T, currentValue: S) => S,
  initVal: S
): S {
  let result = initVal;
  for (let elem of this) {
    result = cb(elem, result);
  }
  return result;
};

// console.log([1, 2, 3, 4, 5].fold<string>((item, currentValue) => (currentValue += item), ""));

//MaxBy
Array.prototype.maxBy = function (this: number[], cb: (item: number) => number): number | null {
  if (!this.length) return null;
  let result = cb(this[0]);
  for (let elem of this) {
    if (cb(elem) > result) result = cb(elem);
  }
  return result;
};

// console.log([3, 4, -5, -10, 4, 7, -8].maxBy((item) => Math.abs(item * 2)));

//MinBy
Array.prototype.minBy = function (this: number[], cb: (item: number) => number): number | null {
  if (!this.length) return null;
  let result = cb(this[0]);
  for (let elem of this) {
    if (cb(elem) < result) result = cb(elem);
  }
  return result;
};

// console.log([3, 4, -5, -10, 1, 4, -8].minBy((item) => Math.abs(item * 2)));

//Count
Array.prototype.count = function (this: object[], keySel: (item: object) => number): number {
  let result = 0;
  for (let elem of this) {
    result += keySel(elem);
  }
  return result;
};

// console.log([{ popul: 300 }, { popul: 450 }].count((item) => item.popul));

//GroupBy
Array.prototype.groupBy = function <T, S extends object>(
  this: object[],
  keySelector: (item: T) => keyof T | string
): S {
  let result: S = {} as S;
  for (let elem of this) {
  }
  return result;
};
const data: { emoji: string; sad: boolean }[] = [
  { emoji: "😀", sad: false },
  { emoji: "🥲", sad: false },
];
console.log(
  data.groupBy<{ sad: { emoji: string; sad: boolean }[] }>((entry) => (entry.sad ? "sad" : "happy"))
);
