export { Tuple, PlaceholderTuple };

/** create a string tuple `"(a, b, c...)"` from an array `[a, b, c...]` */
const Tuple = (arr: string[]) => `(${arr.join(', ')})`;

/** create a placeholder string tuple `(?, ?, ?)` from a length  */
const PlaceholderTuple = (length: number) => Tuple(Array(length).fill('?'));