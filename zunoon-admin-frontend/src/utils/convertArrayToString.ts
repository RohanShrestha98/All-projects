/**
 * Formats an array of items into a single readable string.
 * @param {Array} items - The array of items to format.
 * @returns {string} The formatted string.
 */
const ConvertArrayToString = (items: any) => {
  if (items.length === 0) {
    return "No items to display";
  } else if (items.length === 1) {
    return items[0];
  } else if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  } else {
    const lastItem = items.pop(); // Remove the last item from the array.
    return `${items.join(", ")}, and ${lastItem}`;
  }
};

export default ConvertArrayToString;
