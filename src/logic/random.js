
export function getRandomElementFromArray(arr = []) {
    const len = arr.length;
    const index = Math.round(Math.random() * (len - 1));
    const result = arr[index] || {};
    return result;
}
