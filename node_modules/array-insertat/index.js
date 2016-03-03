"use strict";

/**
 * Inserts an item into the array at `index`.
 *
 * @param {Array} array The array to modify.
 * @param {*} item The item to add.
 * @param {number} index Position where to modify the array.
 * @return {Array} array The modified array.
 * @example
 *
 * insertAt([1, 2], 3, 1)
 *
 * // => [1, 3, 2]
 */
function insertAt(array, item, index) {
    if (Array.isArray(array) === false) {
        return;
    }
    array.splice(index, 0, item);
    return array;
};

module.exports = insertAt;
