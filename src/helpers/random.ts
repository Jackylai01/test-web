export const randomNumber = (
  countNumber: number,
  maxNumber: number,
): number[] => {
  const randomItems: number[] = [];
  if (countNumber > maxNumber) return [];

  for (var i = 1; i <= countNumber; i++) {
    var randomInt = Math.ceil(Math.random() * maxNumber);
    while (randomItems.includes(randomInt)) {
      randomInt = Math.ceil(Math.random() * maxNumber);
    }
    randomItems.push(randomInt);
  }

  return randomItems;
};

/**
 * Random integer that between 0 to max.
 *
 * @param {number} max - A number that is random max number
 * @return {number} A random integer that between 0 to max
 *
 * @example
 *
 *     randomInteger(10): 3
 */
export const randomInteger = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 * Random one item from list.
 *
 * @param {Array} max - A list
 * @return {number} A random one item from list
 *
 * @example
 *
 *     randomItem(['a', 'b', 'c']): 'a
 */
export function randomItem(items: any[]) {
  return items[randomInteger(items.length)];
}
